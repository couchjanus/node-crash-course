"use strict";

var dotenv = require('dotenv');

var _ = require('lodash');

dotenv.config();
var config = {
  env: _.toLower(process.env.NODE_ENV),
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || false,
  host: process.env.HOST || 'localhost',
  database: process.env.DBASE || 'peculiar',
  user: process.env.DBUSER || 'dev',
  password: process.env.DBPASSWORD || 'ghbdtn'
};
module.exports = config;