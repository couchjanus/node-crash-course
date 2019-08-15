const router = require('express').Router();
/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../config/passport');

exports.init = (router, passport) => {
    router.use('/', require('./web'));
    router.use('/blog', require('./blog'));
    router.use('/admin', require('./admin'));
};
// module.exports = router;
