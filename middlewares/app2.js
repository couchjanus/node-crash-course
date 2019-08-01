// middlewares/app2.js

const express = require('express');
const path = require('path');
const expressHbs = require("express-handlebars");
const hbs = require('hbs')

const router = require('../routes/web2');

const errorhandler = require('errorhandler');
const notifier = require('node-notifier');

const ehandler = require('../middlewares/ehandler');

const app = express();

app.use('/static', express.static(__dirname + '/../public/assets'));

// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/../views/partials");
app.set('views', path.join(__dirname, '/../views'));

app.use('/', router);

// development error handler will print stacktrace
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
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

// error handlers
app.use('/', ehandler);

module.exports = app;
