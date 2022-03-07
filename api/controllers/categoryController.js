const categoryModel = require("../models/categoryModels");
const itemModel = require("../models/itemModels");
class CategoryController{
    async get(req,res){
        try{
            const list= await categoryModel.find({});
            res.status(200).json(list);
        }
        catch(err){
            console.log(err);
            res.status(404).json('not found');
        }
    }
    async post(req,res){
        try{
            const item= await categoryModel.create({
                name:req.body.name,
                image:req.body.image
            })
            res.json(item);
        }
        catch(err){
            console.log(err);
            res.json('sai dinh dang');
        }
    }
    async update(req,res){
        try{
            const item=await categoryModel.updateOne({
                _id:req.params._id
            },{
                name:req.body.name,
                image:req.body.image
            })
            res.status(200).json(req.body);
        }
        catch(err){
            res.status(500).json('loi server');
        }
    }
    async delete(req, res){
        try{
            const category=await categoryModel.deleteOne({_id:req.params._id});
            const item=await itemModel.deleteMany({category:req.params._id});
            if(category.deletedCount){
                res.status(200).json('delete success');
            }
            else{
                res.status(404).json('not found');
            }
        }
        catch(err){
            res.status(500).json('loi server');
        }
    }
}
module.exports=new CategoryController();