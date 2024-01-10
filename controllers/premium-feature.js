const Aws = require('aws-sdk');

const User = require('../models/user');



exports.leaderBoard = async (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const leaderBoard = await User.findAll({
            attributes: ['username', 'expense'],
            order: [['expense', 'DESC']],
        });

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

function storeInS3(fileName, fileData) {
    try {
        const s3 = new Aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        });
    
        const options  = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: fileData,
            ACL: 'public-read',
        }
    
        return new Promise((resolve, reject) => {
            s3.upload(options, (error, response) => {
                if(response) resolve(response.Location);
                if(error) console.log(error);
                reject({message : 'Error uploading on s3'});
            });
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}