const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const User = require('./models/users');
const Expense = require('./models/expense');



const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use('/expense', async (req, res, next) => {
    req.user = await User.findByPk(parseInt(req.query.userId));
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