const joi=require('joi');
class OderMiddleware{
    postandput(req,res,next){
        const schema=joi.object({
            telephone:joi.string().regex(/^[0-9]+$/).max(13).min(8).exist(),
            address:joi.string().min(5).max(100).exist(),
            cost:joi.number().min(0).max(100000000).exist(),
            oder_date:joi.string().exist(),
            oder_list:joi.array().items(joi.object({
                item:joi.string().max(80),
                quantity:joi.number().min(0).max(100),
                size:joi.string().min(1).max(5)
            }).exist())
        })
        const validate=schema.validate(req.body);
        if(!validate.error){
            next();
        }
        else{
            res.status(400).json("syntax error!");
        }
    }
}
module.exports=new OderMiddleware();