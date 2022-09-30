const express = require("express");

const router = express.Router();
const cartModal = require("../modal/crud-modal")
router.post("/add", (req, res) => {
    cartModal.create({ username: req.body.username, item_id: req.body.item_id ,category:req.body.category,price:req.body.price,name:req.body.name}).then(() => {
        res.status(200).send("item created  sucessfully")
    }).catch((err) => {
        res.status(400).send(err)
    })
});

router.post("/update", (req, res) => {
    let hudu =req.body;
  
    for (var key in hudu) {
        if(key==="price"){
            cartModal.updateOne({ item_id: req.body.item_id },{$set:{price:req.body.price}}).then(() => {
                res.status(200).send("price updated sucessfully")
            }).catch((err) => {
                console.log(err)
            })
        }else if(key==="category"){
            cartModal.updateOne({ item_id: req.body.item_id },{$set:{category:req.body.category}}).then(() => {
                res.status(200).send("category updated sucessfully")
            }).catch((err) => {
                console.log(err)
            })
        }else if(key==="name"){
            cartModal.updateOne({ item_id: req.body.item_id },{$set:{name:req.body.name}}).then(() => {
                res.status(200).send("name updated sucessfully")
            }).catch((err) => {
                console.log(err)
            })
        };
      }
   
   
})

router.delete("/delete", (req, res) => {
    
    cartModal.deleteOne({ item_id: req.body.id }).then(() => {
        res.status(200).send("item removed sucessfully")
    }).catch((err) => {
        console.log(err)
    })
})



module.exports = router;