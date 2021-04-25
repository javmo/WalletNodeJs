// dotenv levanta las vartaibles de .env
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');



// Initializations
const app = express();
require('./database');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


// routes
app.use('/api/wallets', require('./routes/wallet.routes'));



// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;