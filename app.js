const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const buyPremiumRoute = require('./routes/buyPremium');
const User = require('./models/users');
const Expense = require('./models/expense');
const Order = require('./models/order');
const authenticate = require('./controllers/authenticate');



const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(['/expense', '/buyPremium'], authenticate);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/buyPremium', buyPremiumRoute);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(4000);
}