// middlewares/app3.js

const express = require('express');
const path = require('path');
const router = require('../routes/web');
const app = express();

app.use('/static', express.static(__dirname + '/../public/assets'));

app.use('/', router);

module.exports = app;
