const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    username:String,
    password:String,
    name: String,
    telephone:String,
    email:String,
    address:String,
    admin:Number
})
const customerModel= mongoose.model('customer',customerSchema);
module.exports=customerModel;