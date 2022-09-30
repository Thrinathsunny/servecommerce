const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema ({
    username:{
        type:String,
         required:true,

    },
    item_id:{
         type:String,
         required:true,
    },category:{
        type:String,
        require:true,
    }, price:{
        type:Number,
        require:true,

    } , name :{
        type:String,
        require:true
    }
  
})

const cartModal=mongoose.model("cart",cartSchema);

module.exports=cartModal;