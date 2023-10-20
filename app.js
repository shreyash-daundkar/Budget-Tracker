const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const database = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const User = require('./models/users');
const Expense = require('./models/expense');



const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use('/expense', async (req, res, next) => {
    const token = req.headers['authorization'];
    const { userId } = decryptData(token);
    req.user = await User.findByPk(userId);
    next();
});

app.use('/user', userRouter);
app.use('/expense', expenseRouter);



User.hasMany(Expense);
Expense.belongsTo(User);



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(4000);
}

function decryptData(token) {
    return jwt.verify(token, 'secret');
}