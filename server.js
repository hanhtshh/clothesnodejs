const express = require('express');
require('dotenv').config();
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const dbconnect = require('./api/models');
const router = require('./api/routers/index');
const cookieParser = require('cookie-parser');
const { default: fetch } = require('node-fetch');
const oderModel = require('./api/models/oderModels');
const itemModel = require('./api/models/itemModels');
const authenticateMiddleware = require('./api/middleware/authenticateMiddleware');
const oderMiddleware = require('./api/middleware/oderMiddleware');
dbconnect();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
console.log('ok')
// For a fully working example, please see:
// https://github.com/paypal-examples/docs-examples/tree/main/standard-integration

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};



// create a new order
app.post("/create-paypal-order", async (req, res) => {
    const order = await createOrder();
    res.json(order);
});

// capture payment & store order information or fullfill order
app.post("/capture-paypal-order", authenticateMiddleware.verifyToken, oderMiddleware.postandput, async (req, res) => {
    const { orderID } = req.body;
    const captureData = await capturePayment(orderID, req);
    // TODO: store payment information such as the transaction ID
    res.json(captureData);
});

//////////////////////
// PayPal API helpers
//////////////////////

// use the orders api to create an order
async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00",
                    },
                },
            ],
        }),
    });
    const data = await response.json();
    return data;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId, req) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    console.log(data)
    if (data?.status === 'COMPLETED') {
        const oder = await oderModel.create({
            telephone: req.body.telephone,
            address: req.body.address,
            cost: req.body.cost,
            oder_date: req.body.oder_date,
            oder_list: req.body.oder_list,
            customer: req._id,
            paypalStatus: true
        })
        await Promise.all(req.body.oder_list.map(async oder => await itemModel.updateOne({
            _id: oder.item,
            'size.name': oder.size
        }, {
            '$inc': {
                'size.$.quantity': -oder.quantity
            }
        })))
    }
    return data;
}

// generate an access token using client id and app secret
async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}


app.listen(process.env.PORT || 3000);
router(app);