
const ranks = require("../models/Rank");


const getSingleRank = async (req, res, next) => {
  try {
      const { id } = req.params;

      const rank = await ranks.findById(id);

      if (!rank) {
          throw new Error("rank not found !");
      }

      res.status(200).json({ rank });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


  module.exports = {
    getSingleRank
  }
  
  