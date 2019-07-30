// middlewares/app2.js
const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(__dirname + '/../public/assets'));

app.get('/', function(req, res, next) {
    console.log('Домашняя страница');
    next();
});

// app.get('/', function (req, res) {
//     console.log('Домашняя страница');
// });

// // vs.

// app.use('/', function (req, res, next) {
//     if (req.method !== 'GET' || req.url !== '/')
//       return next();
// });



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
  
app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/about.html'));
});

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/contact.html'));
});

app.get('/*', function(req, res) {
    res.status(404).end("<h1>What you want from me???</h1>");
});

module.exports = app;
