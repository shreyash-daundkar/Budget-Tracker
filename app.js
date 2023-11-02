const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const database = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const premiumRoute = require('./routes/premium');
const forgotPasswordRoute = require('./routes/forgotPassword');
const User = require('./models/users');
const Expense = require('./models/expense');
const Order = require('./models/order');
const DownloadHistory = require('./models/downloadHistory');
const ForgotPasswordRequests = require('./models/forgotPasswordRequests');
const authenticate = require('./controllers/authenticate');



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use(['/expense', '/premium'], authenticate);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/premium', premiumRoute);
app.use('/forgot-password', forgotPasswordRoute);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

User.hasMany(DownloadHistory);
DownloadHistory.belongsTo(User);



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(process.env.PORT || 4000);
}