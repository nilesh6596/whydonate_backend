const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

require('./routes')(app)

module.exports = app;
