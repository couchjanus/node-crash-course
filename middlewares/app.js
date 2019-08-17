// middlewares/app.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const csrf = require('csurf');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }))

// Session
const session = require('../middlewares/session');
app.use(session);
app.use(flash());

// Configuring Passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const {isAuthenticated, isAuthorized} = require('../middlewares/auth');
app.use((req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  res.locals.isAuthenticated = isAuthenticated;
  res.locals.user = req.user;
  next();
});

// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (!req.user &&
//       req.path !== '/login' &&
//       req.path !== '/signup' &&
//       !req.path.match(/^\/auth/) &&
//       !req.path.match(/\./)) {
//       req.session.returnTo = req.originalUrl;
//   } else if (req.user &&
//       (req.path === '/account' || req.path.match(/^\/api/))) {
//       req.session.returnTo = req.originalUrl;
//   }
//   next();
// });

app.use(function(req, res, next){
 res.locals.csrfToken = req.csrfToken();
 next();
});

const router = require('../routes/index');
router.init(app, passport);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler({ log: errorNotification }));
}

function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url;

  notifier.notify({
    title: title,
    messages: str
  });
}
app.use('/', ehandler);

process.on('warning', (warning) => {
  console.log(warning.stack);
});

module.exports = app;
