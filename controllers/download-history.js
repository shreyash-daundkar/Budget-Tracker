exports.downloadHistory = async  (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const data = await req.user.getDownloadHistories();
        res.json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error fetching download history'});
    }
}