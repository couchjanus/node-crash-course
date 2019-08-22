import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import logger from 'morgan'
import errorHandler from 'errorhandler'
import path from 'path'
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const csrf = require('csurf');
const routes = require('../../routes');
const config = require('../../config');

const app = express();

app.use('/static', express.static(__dirname + '/../../public/assets'));
app.set('views', path.join(__dirname, '/../../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }))

app.use(function(req, res, next){
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(logger('dev'));

if (config.env === 'development') {
    app.use(errorHandler());
}

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler for both production and development
app.use(function (err, req, res) {
  res.status(err.status || 500)
  res.render('error', {
    path: process.cwd(),
    message: err.message,
    error: (development) ? err : {}
  })
})

module.exports = app;