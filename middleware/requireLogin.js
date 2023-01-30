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
    const token = authorization.replace(" ");

     jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err);
            return  res.status(200).send({error:"you must be loggedIn"});
        }
    const {userId} = payload;
    console.log('userId of payload',userId);
    Users.findById(userId).then(userdata=>{
        req.user = userdata;
    }).catch(err=>{
        console.log('catch error',err);
    })
    next();
     })
}