const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    name:String,
    image:[String],
    describes:String,
    price:Number,
    sale:Number,
    size:[{name:String,quantity:Number}],
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"category"
    }
})
const itemModel= mongoose.model('item', itemSchema);
module.exports=itemModel;