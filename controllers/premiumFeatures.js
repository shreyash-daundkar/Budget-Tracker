module.exports = (req, res, next) => {
    res.json({isPremium: req.user.isPremium});
}