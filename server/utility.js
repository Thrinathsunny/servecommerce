const signupModal=require("./user/modal/signup-modal")
const bcrypt=require("bcryptjs")

const checkExistinguser= async(username)=>{
   let existinguser=false
   await signupModal.find({username:username}).then((userData)=>{
   if(userData.length){
       existinguser=true
   }
  })
  return existinguser
};

const generatePasswordHash=(password)=>{
 const salt=10;
 return new Promise((resolve,reject)=>{
   bcrypt.genSalt(salt).then((saltHash)=>{
     bcrypt.hash( password,saltHash).then((passwordHash)=>{
      resolve(passwordHash)
     })
 })


 })

}
module.exports={checkExistinguser,generatePasswordHash};