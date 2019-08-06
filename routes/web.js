// routes/web.js
const express = require('express');
const router = new express.Router();

// Общие обработчики

router.get('/', (req, res) => {
    res.render('pages/home/index', { title: 'Me And My Cats Main Page', message: 'Hello there it is Me And My Cats Main Page!'});
});

router.get('/about', (req, res) => {
    res.render('pages/about/index', { 
        title: 'About Me And My Cats', 
        message: 'Hello there Pug Layout!'
    });
});
 
// Обработка ошибки 404
router.get('/errors', function(req, res) {
    res.render('pages/errors/index', { 
        title: 'Page Not Found'
    });
});

module.exports = router;
