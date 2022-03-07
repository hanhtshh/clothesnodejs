
const categoryRouter=require('./categoryRouter');
const itemRouter=require('./itemRouter');
const customerRouter=require('./customerRouter');
const oderRouter=require('./oderRouter');
const router=(app)=>{
    app.use('/category',categoryRouter);
    app.use('/item',itemRouter);
    app.use('/customer',customerRouter);
    app.use('/oder',oderRouter);
}
module.exports=router;