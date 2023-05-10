const express = require('express');
const { getSingleRank } = require('../controllers/rankController');
const User = require('../models/user');
const Rank = require('../models/Rank');
const flatted = require('flatted');

const router = express.Router();

router.get('/usersRanks', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    const userData = [];

    for (const user of users) {
      const lastRankId = user.rank[user.rank.length - 1];
      const lastRank = await Rank.findById(lastRankId);
      if(user.firstName!=="admin" && user.firstName!=="Admin" ){
      userData.push({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        rank: lastRank,
      });}
    }

    res.json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



router.get('/userRank/:id', async (req, res) => {
  try {
    const {id}=req.params

    const user = await User.findById(id);

    const userData2 = [];

  
      const lastRankId = user.rank[user.rank.length - 1];
      const lastRank = await Rank.findById(lastRankId);
      if(user.firstName!=="admin" && user.firstName!=="Admin" ){
      userData2.push({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        rank: lastRank,
      });}
    

    res.json({ userData2 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



router.get('/getSingleRank/:id', getSingleRank);

module.exports = router;
