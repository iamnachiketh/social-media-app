var mongoose=require('mongoose');
 
const usersSchema = new mongoose.Schema({

  userId: {
    type: Number,
    required:  [true, 'Id is required.'],
    unique: true
  },
    name: {
      type: String,
      required:  [true, 'Name is required.'],
      unique: true
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    followers: [{type : mongoose.Schema.Types.ObjectId, ref: "Users"}],
    following : [{type : mongoose.Schema.Types.ObjectId , ref : "Users"}]
});

// const postSchema = new mongoose.Schema(
//     {
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//       },
//       caption: {
//         type: String,
//         trim: true,
//       },
//       location: {
//         type: String,
//       },
//       likes: {
//         type: Number
//       },
//       comment: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Comment',
//       },
//     },
//   );

// const posts = mongoose.model(
//     'Posts', postSchema);
// const users = mongoose.model(
//     'Users', usersSchema);

module.exports = mongoose.model(
  'Users', usersSchema);