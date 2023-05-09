const mongoose = require('mongoose')
const oderSchema = new mongoose.Schema({
    telephone: String,
    address: String,
    cost: Number,
    oder_date: String,
    oder_list: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: "item"
        }, quantity: Number, size: String
    }],
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "customer"
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancle'],
        default: 'Pending'
    },
    paypalStatus: {
        type: Boolean,
        default: false
    }
})
const oderModel = mongoose.model("oder", oderSchema);
module.exports = oderModel;