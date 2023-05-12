const { path } = require("express/lib/application");
const itemModel = require("../models/itemModels");
const oderModel = require("../models/oderModels");

class OderController {
    async getall(req, res) {
        try {
            const oderlist = await oderModel.find({})
                .populate("oder_list.item", ["_id", "name", "image", "price", "sale"])
                .populate("customer");
            res.json({ success: true, data: oderlist });
        }
        catch (err) {
            res.status(500).json({ succes: false, message: "loi server" });
        }
    }
    async get(req, res) {
        try {
            const oderlist = await oderModel.find({ customer: req._id })
                .populate("oder_list.item", ["_id", "name", "image", "price", "sale"])
            res.json({ success: true, data: oderlist })
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
    async getById(req, res) {
        try {
            const oderlist = await oderModel.findOne({ _id: req.params._id })
                .populate("oder_list.item", ["_id", "name", "image", "price", "sale"])
            res.json({ success: true, data: oderlist })
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
    async post(req, res) {
        try {
            const oder = await oderModel.create({
                telephone: req.body.telephone,
                address: req.body.address,
                cost: req.body.cost,
                oder_date: req.body.oder_date,
                oder_list: req.body.oder_list,
                customer: req._id
            })
            await Promise.all(req.body.oder_list.map(async oder => await itemModel.updateOne({
                _id: oder.item,
                'size.name': oder.size
            }, {
                '$inc': {
                    'size.$.quantity': -oder.quantity
                }
            })))
            res.json(req.body);
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
    async put(req, res) {
        try {
            const oder = await oderModel.updateOne({ _id: req.params._id }, req.body)
            res.json(req.body)
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }

    async deleteFailed(req, res) {
        try {
            const order = await oderModel.findById(req.params._id);
            await Promise.all(order.oder_list.map(async oder => await itemModel.updateOne({
                _id: oder.item,
                'size.name': oder.size
            }, {
                '$inc': {
                    'size.$.quantity': +oder.quantity
                }
            })));
            const oder = await oderModel.deleteOne({ _id: req.params._id, customer: req._id })
            if (oder.deletedCount) {
                res.json("delete successfully!")
            }
            else {
                res.status(404).json({ success: false, message: "oder not found" });
            }
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
    async admindelete(req, res) {
        try {
            const oder = await oderModel.deleteOne({ _id: req.params._id })
            if (oder.deletedCount) {
                res.json("delete successfully!")
            }
            else {
                res.status(404).json({ success: false, message: "oder not found" });
            }
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
    async admindeleteFailed(req, res) {
        try {
            const order = await oderModel.findById(req.params._id);
            await Promise.all(order.oder_list.map(async oder => await itemModel.updateOne({
                _id: oder.item,
                'size.name': oder.size
            }, {
                '$inc': {
                    'size.$.quantity': +oder.quantity
                }
            })));
            const oder = await oderModel.deleteOne({ _id: req.params._id })
            if (oder.deletedCount) {
                res.json("delete successfully!")
            }
            else {
                res.status(404).json({ success: false, message: "oder not found" });
            }
        }
        catch (err) {
            res.status(500).json({ success: false, message: "loi server" });
        }
    }
}
module.exports = new OderController();