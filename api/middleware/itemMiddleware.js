const joi = require('joi');
class ItemMiddleware {
    post(req, res, next) {
        const schema = joi.object({
            name: joi.string().max(200).exist(),
            image: joi.array().items(joi.string().max(300).exist()),
            describes: joi.string().max(500).exist(),
            price: joi.number().min(0).max(1000000000).exist(),
            sale: joi.number().min(0).max(1000000000).exist(),
            size: joi.array().items(joi.object({
                name: joi.string().max(5).exist(),
                quantity: joi.number().min(0).max(100000).exist(),
                _id: joi.string().optional()
            }).exist()),
            category: joi.string().max(200).exist()
        })
        const validate = schema.validate(req.body);
        if (!validate.error) {
            next();
        }
        else {
            console.log(validate.error);
            res.status(400).json('syntax error');
        }
    }
}
module.exports = new ItemMiddleware();