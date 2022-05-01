const customerModel = require("../models/customerModel");
const jwt=require('jsonwebtoken');
class AuthenticateMiddleware{
    async authenAdmin(req,res,next){
        try {
            const user=await customerModel.findOne({_id:req._id});
            if(user.admin==1){
                next();
            }
            else{
                return res.status(404).json('not found');
            }
        } catch (error) {
            return res.status(500).json('loi server');
        }
    }
    verifyToken(req,res,next){
        try {
            const _id=jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET);
            if(_id){
                req._id=_id;
                next();
            }
        } catch (error) {
            return res.status(403).json('token is not correct');
        }

    }
}
module.exports=new AuthenticateMiddleware();