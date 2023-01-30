var mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({

    postsId: {
        type: Number,
        required: [true, 'Posts Id is required'],
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Id is required.'],
        ref: "Users"
    },
    Likes: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    caption: {
        type: String,
        trim: true,
    },

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
    'posts', postsSchema);