const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String,
 
  },
  imageNews: {
    type: String,
   
  },
  author: {
    type: String,
    default:"Admin",
 
  }, 
   sdg: {
    type: String,
 
  },
  commentNews: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commentNews",
  },]
  
},
{
  timestamps: true,
}
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
