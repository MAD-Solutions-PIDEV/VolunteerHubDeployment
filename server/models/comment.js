const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    message: String,
    creationDate: {
        type: Date,
        default: Date.now
      },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);