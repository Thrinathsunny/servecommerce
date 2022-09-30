const express=require("express");

const jwt=require("jsonwebtoken")


const app=express();
const cors=require("cors")

require('dotenv').config()

const userController=require("./user/routes/user")
const cartController=require("./user/routes/crud")


const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://thrinath:sunny123@thrinath.61cam88.mongodb.net/?retryWrites=true&w=majority",(data)=>{
console.log("connected to ecommerce db")
},(err)=>{
    console.log(err)
})


app.listen(3001,(err)=>{
    if(!err){
        console.log("port started at 3001")
    }else{
        console.log(err)
    }
}) 
const unprotectedroutes=["/user/login","/user/signup"]
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors())



app.get("/",(req,res)=>{
    res.status(200).send("ecommerce backend")
});

//middleware

app.use("/user",userController);
app.use("/cart",cartController)