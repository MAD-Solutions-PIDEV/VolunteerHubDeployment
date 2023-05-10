
const mongoose = require("mongoose");

const CommentNews = mongoose.model(
  "CommentNews",
  new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
   
    },
    {
      timestamps: true,
    }
  ));

module.exports = CommentNews;
