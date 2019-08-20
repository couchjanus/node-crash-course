"use strict";

var express = require('express');

var router = new express.Router();
router.get('/', function (req, res) {
  res.render('pages/home/index', {
    title: 'Me And My Cats Main Page',
    message: 'Hello there it is Me And My Cats Main Page!'
  });
});
router.get('/about', function (req, res) {
  res.render('pages/about/index', {
    title: 'About Me And My Cats',
    message: 'Hello there Pug Layout!'
  });
});
module.exports = router;