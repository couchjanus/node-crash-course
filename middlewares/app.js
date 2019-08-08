// middlewares/app.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('../routes/index');
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');
const ehandler = require('../middlewares/ehandler');

const mongoose = require('../database/db');

const app = express();

app.use(express.json());

app.use('/static', express.static(__dirname + '/../public/assets'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler({ log: errorNotification }));
}

function errorNotification (err, str, req) {
var title = 'Error in ' + req.method + ' ' + req.url;

notifier.notify({
  title: title,
  message: str
});
}

app.use('/', ehandler);

module.exports = app;
