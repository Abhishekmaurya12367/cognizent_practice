require("dotenv").config();
const app=require("./app");
const connectdb=require("./config/database");
const port= Process.env.port||5000;
const startServer=async()=>{
    try{
      await connectdb();
      app.listen(port,()=>{
        console.log(`server is running the ${port}`);
      })       
    }
    catch(error){
        console.log("server starting has been failled",error.message);
        process.exit(1);

    }
};
startServer();

