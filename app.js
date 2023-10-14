const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use((req, res, next) => res.end('hola amigo'));


app.listen(4000);