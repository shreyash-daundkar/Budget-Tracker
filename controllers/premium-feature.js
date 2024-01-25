const Aws = require('aws-sdk');

const { readUsers } = require('../services/user');

const { storeInS3 } = require('../services/awsS3');



exports.leaderBoard = async (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const leaderBoard = await readUsers({ sortField: expense, sortDesc: true });

        res.json({isPremium: req.user.isPremium, leaderBoard});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error feaching leaderboard'});
    }
}    



exports.downloadReport = async (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const expense = await req.user.getExpenses();
        const fileData = JSON.stringify(expense);
        const fileName = 'Expense' + req.user.id + new Date().toISOString() + '.txt';

        const location = await storeInS3(fileName, fileData);

        await req.user.createDownloadHistory({fileName, location});
        
        res.json({ location });  

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error downloding report'});
    }
}