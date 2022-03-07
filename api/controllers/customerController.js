const customerModel = require("../models/customerModel");
require('dotenv').config();
const crypto=require('crypto-js');
const jwt=require('jsonwebtoken');
const oderModel = require("../models/oderModels");
// sdsaf
class CustomerController{
    async login(req,res){
        try{
            const user=await customerModel.findOne({
                username:req.body.username
            })
            if(crypto.AES.decrypt(user.password,process.env.CRYPTO_SECRET).toString(crypto.enc.Utf8)==req.body.password){
                const token=jwt.sign({
                    _id:user._id
                },process.env.TOKEN_SECRET,{
                    expiresIn:'45m'
                });
                res.cookie('token',token,{httpOnly:true, path:'/'});
                res.json({success:true,data:{
                    name:user.name,
                    address:user.address,
                    telephone:user.telephone,
                    email:user.email,
                    admin:user.admin
                }})
            }
            else{
                res.status(400).json({succes:false,message:'password is not correct'});
            }
        }
        catch(err){
            res.status(404).json({succes:false,message:'account not found!'});
        }
        
    }
    async logout(req,res){
        res.clearCookie('token');
        res.status(200).json('logout successfully');
    }
    async get(req,res){
        try{
            const userlist=await customerModel.find({},['name','address','telephone','email']);
            res.json(userlist);
        }
        catch(err){
            res.status(500).json({success:false,message:'Loi server'});
        }
    }
    async post(req,res){
        try{
            const pass=crypto.AES.encrypt(req.body.password,process.env.CRYPTO_SECRET).toString();
            const userlist=await customerModel.find({username:req.body.username});
            if(userlist.length==0){
                const user=await customerModel.create({
                    username: req.body.username,
                    password:pass,
                    name:'trong',
                    email:'trong',
                    address:'trong',
                    admin:0,
                    telephone:'trong'
                })
                return res.json({succes:true, message:'create account successfully!'});
            }
            return res.json({success:false,message:'tai khoan da ton tai'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({succes:false,message:'loi server'});
        }
    }
    async handleInfomation(req,res){
        try{
            const user=await customerModel.updateOne({_id:req._id},{
                name:req.body.name,
                address:req.body.address,
                telephone:req.body.telephone,
                email:req.body.email
            })
            res.json(req.body);
        }
        catch(err){
            res.status(404).json({succes:false,message:'account not found'});
        }
    }
    async handlePassword(req,res){
        try{
            
            const user= await customerModel.findOne({_id:req._id})
            const pass=crypto.AES.decrypt(user.password,process.env.CRYPTO_SECRET).toString(crypto.enc.Utf8);
            if (pass!=req.body.password) return res.status(400).json({sucess:false,message:'password is not correct'});
            const userUpdate=await customerModel.updateOne({_id:req._id},{
                password:crypto.AES.encrypt(req.body.newpassword,process.env.CRYPTO_SECRET).toString()
            })
            res.json({succes:true,message:'doi mat khau thanh cong'});
        }
        catch(err){
            res.status(500).json({succes:false,message:'loi server'});
        }
    }
    async delete(req,res){
        try {
            const oder=await oderModel.deleteMany({customer:req.params._id});
            const user= await customerModel.deleteOne({_id:req.params._id});
            if(user.deletedCount && oder.deletedCount){
                res.json('succes');
            }
            else{
                res.status(404).json('not found');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({succes:false,message:'loi server'});
        }
    }
}
module.exports=new CustomerController();