const mongoose = require('mongoose');


// schema
const MissionSchema = new mongoose.Schema({

  Title: {
    type: String,
  },

  Category: {
    type: String,
  },

  Description: {
    type: String,
  },
  SkillsRequired: {
    type: [{}],
  },

  LanguageRequired: {
    type:[String],
  },

  StartDate: {
    type: Date,
  },

  EndDate: {
    type: Date,
  },
  
  Location: {
    type: String,
  },

  Image: {
    type: String,
  },

  status: {
    type: String,
    enum: ['inactive','accepted','refused'],
    default: 'inactive'
  },

  AddedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});




const mission = mongoose.model("Mission", MissionSchema); //transfer to collection
module.exports = mission;
//cont user = mongoose.model("User",userSchema);
//module.exports = User;