const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const database = require('./util/database');

const userRouter = require('./routes/userRoute');
const expenseRouter = require('./routes/expenseRoute');
const premiumRoute = require('./routes/premiumRoute');
const forgotPasswordRoute = require('./routes/forgotPasswordRoute');

const User = require('./models/usersModel');
const Expense = require('./models/expenseModel');
const Order = require('./models/orderModel');
const DownloadHistory = require('./models/downloadHistoryModel');
const ForgotPasswordRequests = require('./models/forgotPasswordRequestsModel');

const authenticate = require('./middlewares/authenticate');


 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(['/expense', '/premium'], authenticate);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/premium', premiumRoute);
app.use('/forgot-password', forgotPasswordRoute);

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname , 'public' + req.url))
});



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

User.hasMany(DownloadHistory);
DownloadHistory.belongsTo(User);



database.sync()
 .then(() => app.listen(process.env.PORT || 4000))
 .catch(error => console.log(error));