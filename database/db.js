// database/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'peculiar';

mongoose.Promise = global.Promise;

mongoose.connect(
  DB_CONNECTION + '/' + DB_NAME, options)
  .then(() => console.log('Mongoose Successfully Connected With Global Promise!'))
  .catch((err) => console.error(err));

module.exports = mongoose;
