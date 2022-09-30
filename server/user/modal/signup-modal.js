const mongoose=require("mongoose");

const signupschema=new mongoose.Schema ({
    username:{
        type:String,
         required:true,

    },
    password:{
        type:String,
        required:true,
    },role:{
        type:String,
        required:true
    }
})

const signupModal=mongoose.model("helu",signupschema);

module.exports=signupModal