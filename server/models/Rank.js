
const mongoose = require("mongoose");

const Rank = mongoose.model(
  "Rank",
  new mongoose.Schema({
    
      rankScore:{
        type: Number,
        default:0
    } ,  
    divisions:{ 
        type : String,
        default:"Common",
        enum: ["Common","Bronze", "Silver", "Gold",               
               "Platinum","Diamond","Legendary"],
      },
    },
    {
      timestamps: true,
    }
  ));

module.exports = Rank;
