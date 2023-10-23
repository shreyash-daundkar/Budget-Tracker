const User = require('../models/users');


module.exports = async (req, res, next) => {
    const users = await User.findAll();
    users.sort((x, y) => y.expense - x.expense);
    leaderBoard = users.map(user => {
        const { username, expense} = user;
        return { username, expense}
    });
    res.json({isPremium: req.user.isPremium, leaderBoard});
}                                  