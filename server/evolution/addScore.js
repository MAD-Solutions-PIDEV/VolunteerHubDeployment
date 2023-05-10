const Rank = require('../models/Rank');
const User = require('../models/user');

module.exports.addScore = async (id) => {
    const user = await User.findById(id);

    console.log(user);
    if (Array.isArray(user.rank)) {
        // user.rank[user.rank.length-1].rankScore += 20;
        const rank = await Rank.findById(user.rank[user.rank.length - 1]);
        if (rank) {
            rank.rankScore += 50
            console.log("rank " + rank);
            switch (true) {
                case (rank.rankScore >= 50 && rank.rankScore <= 100):
                    rank.divisions = "Bronze"
                    break;
                case (rank.rankScore > 100 && rank.rankScore <= 200):
                    rank.divisions = "Silver"
                    break;
                case (rank.rankScore > 200 && rank.rankScore <= 350):
                    rank.divisions = "Gold"
                    break;
                case (rank.rankScore > 350 && rank.rankScore <= 500):
                    rank.divisions = "Platinum"
                    break;
                case (rank.rankScore > 500 && rank.rankScore <= 700):
                    rank.divisions = "Diamond"
                    break;
                case (rank.rankScore > 700 ):
                    
                    rank.divisions = "Legendary"
                    break;

            }

            await rank.save();
            // await user.rank[user.rank.length-1].save();
        }
    }
}
