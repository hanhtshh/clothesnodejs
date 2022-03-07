const express=require('express');
const itemController = require('../controllers/itemController');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const itemMiddleware = require('../middleware/itemMiddleware');
const router=express.Router();
router.get('/',itemController.get);
router.post('/',itemMiddleware.post,authenticateMiddleware.verifyToken,authenticateMiddleware.authenAdmin,itemController.post);
router.put('/:_id',itemMiddleware.post,authenticateMiddleware.verifyToken,authenticateMiddleware.authenAdmin,itemController.update);
router.delete('/:_id',authenticateMiddleware.verifyToken,authenticateMiddleware.authenAdmin,itemController.delete);
module.exports=router;
// dfsef