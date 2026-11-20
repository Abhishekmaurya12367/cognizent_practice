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
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
    ,
    fullname:{
        type:string,
        required:true,  
    },
    phone:{
        type:string,
        require:true
    },
    addressLine1:{
        type:string,
        required:true, 
    },
    addressLine2:{
        type:string,
        required:true
    }
    ,
    city:{
        type:string , 
        required:true
    }
    ,
    state:{
        type:string,
        required:true
    }
    ,
   country:{
    type:string,
    required:true
   },
  postCode:{
    type:string,
    required:true
   },
   addressType:{
     type:string,
     enum:["work","home","other"],
     required:true
   }
   ,
   isdefault:{
    type:Boolean,
    default:true
   }

},{timeStamps:true});

const categorySchema=new Schema({
    
})
