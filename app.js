const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');



const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use((req, res, next) => res.end('hola amigo'));



createServer();

async function createServer() {
    const res = await database.sync(); 
    app.listen(4000);
}