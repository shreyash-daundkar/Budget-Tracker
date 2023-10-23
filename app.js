const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const database = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const premiumRoute = require('./routes/premium');
const User = require('./models/users');
const Expense = require('./models/expense');
const Order = require('./models/order');
const authenticate = require('./controllers/authenticate');



const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use(['/expense', '/premium'], authenticate);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/premium', premiumRoute);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(4000);
}