const mongoose=require("mongoose")
const connectdb=async()=>{
    try{
        await mongoose.connept(Process.env.mongodb_uri);
        console.log("database connected successfuly");
    }
    catch(error){
        console.log("database is connected first of all connect it",error.message);
        process.exit(1);
    }
    
};
module.exports=connectdb;

