// middlewares/app4.js

const express = require('express');
const path = require('path');
const router = require('../routes/web2');
const app = express();

app.use('/static', express.static(__dirname + '/../public/assets'));

app.use('/', router);

// error handlers

// production error handler

app.get('/err', function(req, res, next){ 
  // Чтобы вызвать ошибку из обработчиков запросов и middleware:
  next(error);
  // Или, если мы хотим передать конкретное сообщение об ошибке, мы создаем объект Error и передаем его функции next ():
  next(new Error('Something went wrong :-('));
});

app.get('/problematic', (req, res, next) => {
    let err = new Error('I\'m sorry, you can\'t do that, Dude.');
    err.httpStatusCode = 304;
    next(err);
});

// handles unauthorized errors
app.use((err, req, res, next) => {
  if(err.httpStatusCode === 304){
    res.status(400).end('I\'m sorry, you can\'t do that, Dude.');
  }
  next(err);
});

// // handles not found errors
// app.use((err, req, res, next) => {
//   if (err.httpStatusCode === 404) {
//     res.status(400).render('NotFound');
//   }
//   next(err);
// });

// // handles unauthorized errors
// app.use((err, req, res, next) => {
//   if(err.httpStatusCode === 304){
//     res.status(304).render('Unauthorized');
//   }
//   next(err);
// })



app.use(function(req, res, next) {
  if (req.url == '/forbidden') {
    next(new Error("wops, denied"));
  } else {
    next();
  }
});

app.get('/forbidden', function(req, res, next) {
  let err = new Error(`${req.ip} tried to access /Forbidden`); // Sets error message, includes the requester's ip address!
  err.statusCode = 403;
  next(err);
});


app.get('/nonexistant', (req, res, next) => {
    let err = new Error('I couldn\'t find it.');
    err.status = 404;
    next(err);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Page Not Found');
//   err.status = 404;
//   next(err);
// });

app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

// Instead of

// app.get('*', function(req, res, next) {
// ...
// });

// you can also use

// app.use(function(req, res, next) {
// ...
// });

// This middleware function must be at very bottom of the stack.


app.get('*', function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
  err.statusCode = 404;
  err.shouldRedirect = true; //New property on err so that our middleware will redirect
  next(err);
});

// handles not found errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(400).end('I am not found this. What you want from me?');
  } else {
    next(err);
  }
});


app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

  if (err.shouldRedirect) {
    res.render('myErrorPage') // Renders a myErrorPage.html for the user
  } else {
    res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
  }
});

// Main middleware

// catch all

// отправить статус 500 (Внутренняя ошибка сервера) без отправки каких-либо данных:
// app.use(function(err, req, res, next) {    
//   // Do logging and user-friendly error message display
//   res.end(500);    
// });

// app.use(function(err, req, res, next) {
//   // Ведение журнала и удобное отображение сообщений об ошибках
//   console.error(err);
//   res.status(500).send('Server internal error');
// });


// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke!');
// });

// app.use(function(err, req, res, next) {
//   // Do logging and user-friendly error message display
//   console.error(err);
//   res.status(500).send({status:500, message: 'Внутренняя ошибка сервера', type:'internal'}); 
// })

// We can also use res.redirect():
// app.use(function(err, req, res, next) {    
//     // Do logging and user-friendly error message display    
//     res.redirect('/500');
// })

app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});


// app.use((err, req, res, next) => {
//   console.log(err);
//   if (!res.headersSent) {
//     res.status(err.httpStatusCode || 500).end('Something broke! UnknownError');
//   }
// });


// development error handler will print stacktrace

// app.use(function(err, req, res, next) {
//     // NODE_ENV = 'production'
//     if (app.get('env') == 'development') {
//       var errorHandler = express.errorHandler();
//       errorHandler(err, req, res, next);
//     } else {
//       res.send(500);
//     }
// });

// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//       res.status(err.status || 500);
//       res.render('error', {
//           message: err.message,
//           error: err
//       });
//   });
// }

module.exports = app;
