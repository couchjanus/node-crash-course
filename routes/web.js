// routes/web.js
const express = require('express');
const controllers = require('../controllers/auth');

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
 
// // Обработка ошибки 404
// router.get('/errors', function(req, res) {
//     res.render('pages/errors/index', { 
//         title: 'Page Not Found'
//     });
// });

router.get('/login', controllers.auth_controller.login_get);
router.post('/login', controllers.auth_controller.login_post);
router.get('/logout', controllers.auth_controller.logout_get);

router.get('/forgot', controllers.auth_controller.forgot_get);
router.post('/forgot', controllers.auth_controller.forgot_post);

router.get('/reset/:token', controllers.auth_controller.reset_get);
router.post('/reset/:token', controllers.auth_controller.reset_post);

router.get('/signup', controllers.auth_controller.signup_get);
router.post('/signup', controllers.auth_controller.signup_post);

module.exports = router;
