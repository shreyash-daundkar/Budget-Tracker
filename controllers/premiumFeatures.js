const User = require('../models/users');



const notPremium = () => res.status(404).json({ message: 'User is not premium'});


exports.leaderBoard = async (req, res, next) => {
    if(!req.user.isPremium) notPremium();
    const leaderBoard = await User.findAll({
        attributes: ['username', 'expense'],
    });
    leaderBoard.sort((x, y) => y.expense - x.expense);
    res.json({isPremium: req.user.isPremium, leaderBoard});
}    

