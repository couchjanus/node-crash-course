// middlewares/app.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const passport = require('passport');
// const expressSession = require('express-session');

const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const csrf = require('csurf');

const router = require('../routes/index');
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');
const ehandler = require('../middlewares/ehandler');

const {isAuthenticated, isAuthorized} = require('../middlewares/auth');
// const session = require('../middlewares/session');

const mongoose = require('../database/db');

const app = express();

app.use(express.json());

app.use('/static', express.static(__dirname + '/../public/assets'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'config.session.secret',
  cookie: {
    "path": "/",
    "httpOnly": true,
    "maxAge": null
  },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(
    {
      url: 'mongodb://localhost:27017/peculiar',
    }
    )
}));

// Session
// app.use(session({
//   secret: config.session.secret,
//   // key: config.session.key,
//   // cookie: {
//   //   "path": "/",
//   //   "httpOnly": true,
//   //   "maxAge": null
//   // },
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({
//     // url: config.mongo.connection + '/' + config.mongo.dbase,
//     url: 'mongodb://localhost:27017/peculiar',
//     useUnifiedTopology: true,
//     // autoReconnect: true,
//     // ttl: 14 * 24 * 60 * 60, // = 14 days. Default
//     // autoRemove: 'interval',
//     // autoRemoveInterval: 10, // In minutes. Default
//     // clear_interval: 3600
//   })
// }));

// Configuring Passport
// app.use(expressSession({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.SESSION_SECRET||'keyboard cat',
//     // cookie: {secure: true, maxAge: 1209600000}, // two weeks in milliseconds
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// require('../middlewares/authentication')(passport); // pass passport for configuration
// Монтируем Passport:

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.use(csrf());
app.use(function(req, res, next){
 res.locals.csrftoken = req.csrfToken();
 next();
});

/**
 * Express middleware
 */
app.use((req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  console.log(isAuthenticated);
  res.locals.isAuthenticated = isAuthenticated;
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
      req.session.returnTo = req.originalUrl;
  } else if (req.user &&
      (req.path === '/account' || req.path.match(/^\/api/))) {
      req.session.returnTo = req.originalUrl;
  }
  next();
});

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash());

// app.use('/', router);

router.init(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
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
  message: str
});
}

app.use('/', ehandler);

process.on('warning', (warning) => {
  console.log(warning.stack);
});

module.exports = app;
