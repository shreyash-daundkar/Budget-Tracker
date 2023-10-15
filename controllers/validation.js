module.exports = (req, res, next) => {
    const {email, password} = req.body;
    if(email && !isValidEmail(email)) {
        return res.status(400).send('Invalid Email');
    }
    if(password && !isValidPassword(password)) {
        return res.status(400).send('Invalid Password');
    }
    next();
}


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const minLength = 8;
    return password.length >= minLength;
}
