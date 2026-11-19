const mongoose =require("mongoose");
const {Schema,model}=mongoose;
const useSchema=new Schema({
    name:{
        type:string,
        require:true,
        trim:true
    }
})
