const jwt = require('jsonwebtoken');

const JWT_SECRET = "NACHIKETHKC"
const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        console.log('this is first')
       return res.send({error:"you must be loggedIn1"})
    }
    const token = authorization.replace("bearer","");
     jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(200).send({error:"you must be loggedIn"});
        }
    const {userId} = payload;
    Users.findById(userId).then(userdata=>{
        req.user = userdata;
    }).catch(err=>{
        console.log(err);
    })
    next();
     })
}