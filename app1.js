import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import notifier from 'node-notifier';
import router from './routes/web.mjs'; 
import ehandler from './middlewares/ehandler';

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

export default app;
