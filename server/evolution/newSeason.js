const Rank = require('../models/Rank');
const User = require('../models/user');

module.exports.newSeason= async()=> {
    const allUsers = await User.find();
    console.log("users :");
    console.log(allUsers);

    
      
      // Loop through the users and update their ranks
      for (let i = 0; i < allUsers.length; i++) {
        const rank = new Rank({
            rankScore: 0,
            divisions: 'Common',
          });
          allUsers[i].rank.push(rank);
          await rank.save();
          await allUsers[i].save();
          


      }

    




    
}
