const mongoose=require('mongoose');

module.exports=async function(){
    try{
        const db=await mongoose.connect('mongodb+srv://hanhtshh:mhsdm6dk@cluster0.7s3ios8.mongodb.net/');
        console.log('Ket noi den database thanh cong');

    }
    catch(err){
        console.log('Ket noi den database that bai');
        process.exit(1);
    }
};