const mongoose =require("mongoose");
const {Schema,model}=mongoose;
const useSchema=new Schema({
    name:{
        type:string,
        require:true,
        trim:true
    },
    email:{
        type:string,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    }
    ,
    password:{
        type:string,
        require:true,
        select:false
    }
    ,
    phone:string,
    role:{
        type:string,
        enum:["admin","customer"],
        default:customer
    }
    ,
    accountStatus:{
        type:string,
        enum:["active","blocked"],
        default:"active"

    }
    ,
    isVarified:{
        type:Boolean,
        default:false

    }
},{timestamps:true});
const addressSchema=new Schema({
    
})
