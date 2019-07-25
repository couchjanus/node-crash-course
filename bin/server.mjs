import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
/**
* Initialize environment variables.
*/
dotenv.config();

const app = express();

// ========================================
const APP_PORT =
(process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const APP_ENV = process.env.APP_ENV || 'development';

// ========================================

app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.set('env', APP_ENV);

// ========================================
app.locals.title = process.env.APP_NAME || 'Мое приложение';
app.locals.version = process.env.APP_VERSION;
app.locals.email = process.env.APP_EMAIL || 'me@myapp.com';

// ========================================
app.use('/static', express.static(__dirname + '/../public/assets'));

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get("/about", function(request, response){
    response.sendFile(path.join(__dirname + '/../public/about.html'));
});

app.get("/contact", function(request, response){
    response.sendFile(path.join(__dirname + '/../public/contact.html'));
});

app.get('*', function(request, response){
    response.status(404).send('What you want from me???');
});

app.listen(app.get('port'), app.get('host'), (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`${app.locals.title} Version: ${app.locals.version} started at http://${app.get('host')}:${app.get('port')}`);
});

// module.exports = app;
