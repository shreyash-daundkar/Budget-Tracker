const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');
const userRouter = require('./routes/user');


const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use('/user', userRouter);



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(4000);
}