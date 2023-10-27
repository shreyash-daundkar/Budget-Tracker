const User = require('../models/users');



const notPremium = res => res.status(404).json({ message: 'User is not premium'});


exports.leaderBoard = async (req, res, next) => {
    try {
        if(!req.user.isPremium) notPremium(res);

        const leaderBoard = await User.findAll({
            attributes: ['username', 'expense'],
            order: [['expense', 'DESC']],
        });

        res.json({isPremium: req.user.isPremium, leaderBoard});

    } catch (error) {
        return res.status(500).json({message: 'Error feaching leaderboard'});
    }
}    

exports.downloadReport = async (req, res, next) => {
    try {
        if(!req.user.isPremium) notPremium(res);

        const expense = await req.user.getExpenses();
        const fileData = JSON.stringify(expense);
        const fileName = 'Expense' + req.user.id + new Date();

        res.json({fileName, fileData});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Error downloding report'});
    }
}