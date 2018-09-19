const express = require('express');
// const cors = require('cors');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const createEnsureAuth = require('./auth/ensure-auth')();
const { resolve } = require('path');
require('./models/register-plugins'); 
const redirectHttp = require('./utils/redirect-http');
const checkConnection = require('./utils/check-connection');

// COMMON MIDDLEWARE
if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

app.use(morgan('dev'));
// app.use(cors());
app.use(express.static('public'));
app.use(express.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// ROUTES:
const auth = require('./routes/auth');
const comics = require('./routes/comics');
const catalogs = require('./routes/catalogs');

app.use('/api/auth', auth);
app.use('/api/comics', comics);
app.use('/api/catalogs', createEnsureAuth, catalogs);

if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

// CATCH ALL FOR SPA
app.use((req, res) => {
    res.sendFile('index.html', {
        root: resolve(__dirname, '/../public')
    });
});

//error handler goes last
//eslint-disable-next-line
app.use(errorHandler());

module.exports = app;