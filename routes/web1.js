// routes/web.js
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


// маршрут на основе шаблонов строк.

// маршрут сопоставляет acd и abcd.
router.get('/ab?cd', (req, res) => {
    res.send('ab?cd');
});

// маршрут сопоставляет abcd, abbcd, abbbcd
router.get('/ab+cd', (req, res) => {
    res.send('ab+cd');
});

// маршрут сопоставляет abcd, abxcd, abRABDOMcd, ab123cd и т.д.
router.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});
   
// маршрут сопоставляет /abe и /abcde.
router.get('/ab(cd)?e', function(req, res) {
   res.send('ab(cd)?e');
});



// маршрут сопоставляет butterfly и dragonfly, но не butterflyman, dragonfly man и т.д.

router.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});
   
// Одна функция обратного вызова может обрабатывать один маршрут. 

router.get('/example/a', function (req, res) {
 res.send('Hello from A!');
});
   
// Один маршрут может обрабатываться несколькими функциями обратного вызова (обязательно укажите объект next). Например:
router.get('/example/b', function (req, res, next) {
 console.log('the response will be sent by the next function ...');
 next();
}, function (req, res) {
 res.send('Hello from B!');
});

// Массив функций обратного вызова может обрабатывать один маршрут. 

var cb0 = function (req, res, next) {
 console.log('CB0');
 next();
}

var cb1 = function (req, res, next) {
 console.log('CB1');
 next();
}

var cb2 = function (req, res) {
    res.send('Hello from C!');
}
   
router.get('/example/c', [cb0, cb1, cb2]);
   
// Маршрут может обрабатываться сочетанием независимых функций и массивов функций. Например:

var cb0 = function (req, res, next) {
 console.log('CB0');
 next();
}

var cb1 = function (req, res, next) {
 console.log('CB1');
 next();
}

router.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

// маршрут сопоставляет любой элемент с “a” в имени маршрута.

// router.get(/a/, function(req, res) {
//     res.send('/a/');
// });

router.get('/*', function(req, res) {
    res.status(404).end("<h1>What you want from me???</h1>");
});

module.exports = router;
