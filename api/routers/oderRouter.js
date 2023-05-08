const express=require('express');
const oderController = require('../controllers/oderController');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const oderMiddleware = require('../middleware/oderMiddleware');
const router=express.Router();
router.get('/all',authenticateMiddleware.verifyToken,oderController.getall);
router.get('/',authenticateMiddleware.verifyToken,oderController.get);
router.get('/get-by-id/:_id',authenticateMiddleware.verifyToken,oderController.getById);
router.post('/',authenticateMiddleware.verifyToken,oderMiddleware.postandput,oderController.post);
router.put('/:_id',oderMiddleware.postandput,oderController.put);
router.delete('/:_id',authenticateMiddleware.verifyToken,oderController.deleteFailed);
router.delete('/admindeleteFailed/:_id',authenticateMiddleware.verifyToken,oderController.admindeleteFailed);
router.delete('/admindelete/:_id',authenticateMiddleware.verifyToken,authenticateMiddleware.authenAdmin,oderController.admindelete);

// Vui lòng tham khảo thêm tại code demo
module.exports=router;