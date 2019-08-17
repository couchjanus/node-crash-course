const router = require('express').Router();
const passport = require('../config/passport');

exports.init = (router, passport) => {
    router.use('/', require('./web'));
    router.use('/blog', require('./blog'));
    router.use('/admin', require('./admin'));
};

