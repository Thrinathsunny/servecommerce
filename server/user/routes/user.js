const express = require("express");
const signupModal = require("../modal/signup-modal")
const router = express.Router();
const { checkExistinguser, generatePasswordHash } =require("../../utility");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    console.log(1)
    if (await checkExistinguser(req.body.username)) {
        res.status(200).send("username already exist")
    } else {
               generatePasswordHash(req.body.password).then((passwordHash) => {
            signupModal.create({ username: req.body.username,  password: passwordHash,role:req.body.role }).then((data) => {
                res.status(200).send(`${req.body.username} signedup sucessfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        })
    }
})
router.post("/login", (req, res) => {
    
    signupModal.find({ username: req.body.username }).then((userData) => {
        console.log(userData)
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                if (val) {
                    const authToken = jwt.sign(userData[0].username,process.env.SECRET_KEY);
                    console.log(1)
                    res.status(200).send({ authToken });
                } else {
                    res.status(400).send("invalid password")
                }
            })
        } else {
            res.status(400).send("unauthorized user")
        }
    })

})
router.post("/customer", (req, res) => {
    console.log(req.body.authToken)
    const user =jwt.verify(req.body.authToken,process.env.SECRET_KEY);
   
    signupModal.find({username:user}).then((userData)=>{
        let vij=userData[0].role
       
        if(vij==="admin"){
            let customernames=[]
            console.log(1)
            signupModal.find().then((hep)=>{
                hep.map((e)=>{
                    customernames.push(e.username)
                })
                res.status(200).send(customernames)
            })
       
        }else{
            res.status(400).send("user is not authorized to view all customers")
        }
    })
});


          



module.exports = router;