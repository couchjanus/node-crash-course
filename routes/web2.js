// routes/web2.js
const express = require('express');
const path = require('path');

const router = new express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
  
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/about.html'));
});

router.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/contact.html'));
});

router.get('/500', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/500.html'));
});

router.get('/errors', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/errors.html'));
});



module.exports = router;
