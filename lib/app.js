const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
const { resolve } = require('path');
require('./models/register-plugins'); 
const redirectHttp = require('./utils/redirect-http');
const checkConnection = require('./utils/check-connection');

// COMMON MIDDLEWARE
if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

//add routes - don't forget to change thing:
// const things = require('./routes/things');
// app.use('/api/things', things);

// const ensureAuth = createEnsureAuth();

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