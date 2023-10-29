const Aws = require('aws-sdk');
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
        const fileName = 'Expense' + req.user.id + new Date().toISOString() + '.txt';

        const location = await storeInS3(fileName, fileData);

        res.json({ location });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Error downloding report'});
    }
}


function storeInS3(fileName, fileData) {
    try {
        const s3 = new Aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        });
    
        const options = {
            Bucket: 'budget-tracker-57',
            Key: fileName,
            Body: fileData,
            ACL: 'public-read',
        }
    
        return new Promise((resolve, reject) => {
            s3.upload(options, (error, response) => {
                if(error) {
                    console.log(error)
                    reject(error);
                }
                resolve(response.Location);
            });
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Error uploading on s3'});
    }
}