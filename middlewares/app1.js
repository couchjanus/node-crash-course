// middlewares/app1.js
const express = require('express');
const path = require('path');
const app = express();

// ========================================
app.use('/static', express.static(__dirname + '/../public/assets'));

// Middleware  
app.use(function(req, res, next) {
    if (req.url == '/') {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    } else {
      next();
    }
});
  
// Middleware
app.use(function(req, res, next) {
    if (req.url == '/about') {
      res.sendFile(path.join(__dirname + '/../public/about.html'));
    } else {
      next();
    }
});

// Middleware
app.use(function(req, res, next) {
    if (req.url == '/contact') {
      res.sendFile(path.join(__dirname + '/../public/contact.html'));
    } else {
      next();
    }
});

app.use(function(req, res) {
    res.status(404).end("<h1>What you want from me???</h1>");
});

module.exports = app;
