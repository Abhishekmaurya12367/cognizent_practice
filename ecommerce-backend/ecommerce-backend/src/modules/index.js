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
    name:{
        type:string,
        required:true
    }
    ,
    slug:{
        type:string,
        required:true,
        unique:true
    },
    parentId:{
        type:Schema.types.ObjectId,
        ref:"Category",
        default:null
    },
    description:string,
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true});
const productSchema=new Schema({
    name:{
        type:string,
        required:true
    },
    slug:{
      type:string,
      required:true,
      unique:true
    },
    brand:{
    type:string,
     required:true
    },
    discription:{
        type:string,
        required:true

    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
    ,
    image:[string],
    tags:[string],
 isActive:{
    type:Boolean,
    default:true
 }
},{timestamps:true});
productSchema.index({categoryId:1,isActive:1});
productSchema.index({name:"text",discription:"text"});
const productvarient=new Schema({

})

//basic promises code actually how we write 
const promises=new promises((resolve,reject)=>{
    

})


