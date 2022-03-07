const joi=require('joi');
class CategoryMiddleware{
    post(req,res,next){
        const schema=joi.object({
            name:joi.string().min(1).max(50).exist(),
            image:joi.string().min(1).max(400).exist()
        });
        const validate=schema.validate(req.body)
        if(!validate.error){
            next();
        }
        else{
            res.status(500).json('Syntax error');
        }
    }
}
module.exports=new CategoryMiddleware();