const mongoose = require("mongoose");
const Posts = require("./posts");
mongoose.connect('mongodb+srv://nachiketha:y02V0s1xgdOxzzD7@cluster0.yjvvcdm.mongodb.net/social-media-db', {useNewUrlParser:true, useUnifiedTopology:true});
//y02V0s1xgdOxzzD7:nachiketha
const Users = require("./users");
const bcrypt = require('bcryptjs');

const insertUser = (user_object) => {

  bcrypt.hash(user_object.password,12).then(hashedPassword=>{

    const users_model = new Users( {
      userId: user_object.userId,
      email: user_object.email,
      name: user_object.name,
      password: hashedPassword,
      address: user_object.address, 
      followers: [],
      following : []
    })
   users_model.save();
    console.log("User Insert complete!")
  })
    
}

const insertposts = async (posts_object) => {
  const posts_model = new Posts( {
  postsId : posts_object.postsId,  
  userId: posts_object.userId,
  Likes : posts_object.Likes,
  createdAt: posts_object.createdAt,
  caption:posts_object.caption
    
  })
  await posts_model.save();
  console.log('Posts Insert Completed !!!');
}



module.exports = { 
  insertUser,
  insertposts
 };