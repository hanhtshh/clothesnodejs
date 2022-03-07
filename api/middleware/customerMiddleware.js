const joi=require('joi');
class CustomerMiddleware{
    post(req,res,next){
        const schema=joi.object({
            username:joi.string().min(5).max(50).exist(),
            password:joi.string().min(4).max(30).exist(),
            name:joi.string().min(4).max(50).exist()
        })
        const validate=schema.validate(req.body);
        if(!validate.error){
            next();
        }
        else{
            res.status(400).json("syntax error");
        }
    }
    handlePassword(req,res,next){
        const schema=joi.object({
            password:joi.string().min(4).max(30).exist()
        })
        const validate=schema.validate(req.body);
        if(!validate.error){
            next();
        }
        else{
            res.status(400).json("syntax error");
        }
    }
    handleInfo(req,res,next){
        const schema=joi.object({
            name:joi.string().min(4).max(50).exist(),
            telephone:joi.string().regex(/^[0-9]+$/).min(4).max(30).exist(),
            email:joi.string().min(4).max(30).exist(),
            address:joi.string().min(4).max(200).exist()
        })
        const validate=schema.validate(req.body);
        if(!validate.error){
            next();
        }
        else{
            res.status(400).json("syntax error");
        }
    }
}
module.exports=new CustomerMiddleware();