// middlewares/app1.js

const express = require('express');

const path = require('path');

const router = require('../routes/index');
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');
const ehandler = require('../middlewares/ehandler');

const db = require('../database/db');

const app = express();

app.use('/static', express.static(__dirname + '/../public/assets'));

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

db.connect(`mongodb://localhost:27017`,   { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Unable to connect to MongoDB.');
    process.exit(1);
  } else {
    console.log('Connected to MongoDB Successful!');
  }
});

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
