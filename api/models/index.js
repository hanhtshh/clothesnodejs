const mongoose=require('mongoose');

module.exports=async function(){
    try{
        const db=await mongoose.connect('mongodb+srv://hanhtshh:mhsdm6dk@clothes.3gvxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log('Ket noi den database thanh cong');
    }
    catch(err){
        console.log('Ket noi den database that bai');
        process.exit(1);
    }
};