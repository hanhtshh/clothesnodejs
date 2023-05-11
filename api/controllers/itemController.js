const categoryModel = require("../models/categoryModels");
const itemModel = require("../models/itemModels");

class ItemController {
    async get(req, res) {
        try {
            const keySearch = req.query.keySearch;
            if (keySearch) {
                const list = await itemModel.find({
                    "name": { "$regex": keySearch, "$options": "i" }
                })
                    .populate("category");
                res.json(list);
            }
            else {
                const list = await itemModel.find({})
                    .populate("category");
                res.json(list);
            }
        }
        catch (err) {
            res.status(404).json('not found');
        }
    }
    async post(req, res) {
        try {
            const category = await categoryModel.findOne({
                name: req.body.category
            })
            if (category) {
                const item = await itemModel.create({
                    name: req.body.name,
                    image: req.body.image,
                    describes: req.body.describes,
                    sale: req.body.sale,
                    size: req.body.size,
                    price: req.body.price,
                    category: category._id
                })
                res.json({
                    name: req.body.name,
                    image: req.body.image,
                    describes: req.body.describes,
                    sale: req.body.sale,
                    size: req.body.size,
                    price: req.body.price,
                    category: {
                        _id: category._id,
                        name: category.name
                    }
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Category is not exsit!"
                })
            }
        }
        catch (err) {
            res.status(500).json('err');
        }
    }
    async getItemDetail(req, res) {
        try {
            console.log(req.params)
            const item = await itemModel.findById(req.params.id).populate("category");
            if (item) {
                res.json({
                    item
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Category is not exsit!"
                })
            }
        }
        catch (err) {
            res.status(500).json('err');
        }
    }
    async update(req, res) {
        try {
            const item = await itemModel.updateOne({ _id: req.params._id }, {
                name: req.body.name,
                image: req.body.image,
                describes: req.body.describes,
                sale: req.body.sale,
                size: req.body.size,
                price: req.body.price
            })
            res.json(req.body);
        }
        catch {
            res.status(500).json('error');
        }
    }
    async delete(req, res) {
        try {
            const respone = await itemModel.deleteOne({ _id: req.params._id });
            if (respone.deletedCount) {
                res.json('succes');
            }
            else {
                res.status(404).json('not found');
            }
        }
        catch (err) {
            res.status(500).json('error');
        }
    }
}
module.exports = new ItemController();