import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import notifier from 'node-notifier';
import router from './routes/web.mjs'; 
import ehandler from './middlewares/ehandler';

import morgan from 'morgan';
import logger from './middlewares/winston';

import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();
const app = express();
// ========================================
app.set('env', process.env.APP_ENV || 'development');
app.set('port', (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) ||process.env.APP_PORT || process.env.PORT || 3000);
app.set('host', process.env.APP_HOST || '0.0.0.0');

// ========================================
app.locals.title = process.env.APP_NAME || 'Мое приложение';
app.locals.version = process.env.APP_VERSION;
app.locals.email = process.env.APP_EMAIL || 'me@myapp.com';

// ========================================
app.use('/static', express.static(__dirname + '/public/assets'));

// Logger

// if (app.get('env') === 'development') {
//    app.use(morgan('dev'));
// }


// app.use(morgan('combined', {
//   stream: fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})
// }
// ));


// setup the logger

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// app.use(morgan('combined', { stream: accessLogStream }))


// // log only 4xx and 5xx responses to console
// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

// // log all requests to access.log
// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }))

// if (app.get('env') == 'production') {
//   app.use(morgan('common', {
//       skip: function(req, res) {
//                 return res.statusCode < 400
//             },
//       stream: fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})
//     }
// ));
// } else {
//   app.use(morgan('combined', {
//       // stream: fs.createWriteStream(__dirname + '/logs/combined.log', {flags: 'a'})
//       stream: logger.stream 
//     }
//   ));
// }

// app.use(
//   morgan('combined', 
//         { 
//           stream: logger.stream 
//         }
//   ));


// if (app.get('env') === 'development') {
// //   app.use(morgan('dev'));
//     app.use(morgan('combined', { stream: logger.stream }));
// }


app.use('/', router);

// development error handler will print stacktrace
// console.log(process.env.APP_ENV);
if (process.env.APP_ENV === 'development') {
    // only use in development
    // app.use(errorhandler());
    app.use(errorhandler({ log: errorNotification }));
}
 
function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url;
 
  notifier.notify({
    title: title,
    message: str
  });
}

function handleErrors(error) {
  console.log("I'm telling your mom about this: " + error);
}

app.get('/bad', function(req, res, next) {
  return next('REALLY BAD');
  return res.send('this is home page!');
});

// Remember, this must be after all your other routes
app.use(function(err, req, res, next) {
  console.log('Problem occurred, we could put logic here...');
  console.log('Error was: ' + err);
  if (err === 'REALLY BAD') {
      handleErrors(err);
  }
  next();
});

// error handlers
app.use('/', ehandler);

export default app;
