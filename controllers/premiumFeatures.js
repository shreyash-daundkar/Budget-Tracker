const User = require('../models/users');


exports.leaderBoard = async (req, res, next) => {
    const leaderBoard = await User.findAll({
        attributes: ['username', 'expense'],
    });
    leaderBoard.sort((x, y) => y.expense - x.expense);
    res.json({isPremium: req.user.isPremium, leaderBoard});
}                                  