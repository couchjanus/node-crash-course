import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

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

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/about", function(request, response){
    response.sendFile(path.join(__dirname + '/public/about.html'));
});

app.get("/contact", function(request, response){
    response.sendFile(path.join(__dirname + '/public/contact.html'));
});

app.get('*', function(request, response){
    response.status(404).send('What you want from me???');
});

export default app;
