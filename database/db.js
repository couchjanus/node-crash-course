// database/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};

const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'peculiar';
 
// ================Collback=================
// mongoose.connect(DB_CONNECTION + '/' + DB_NAME, options, 
//    (err) => {
//     if (err) throw err;
//     console.log('Mongoose Successfully connected');
// });

// ================Promise==================
// mongoose.connect(DB_CONNECTION + '/' + DB_NAME, options).then(() => {
//   console.log('The `mongoose.connect()` promise resolves to undefined');    
//     err => { 
//         // handle initial connection error
//         console.error.bind(console, 'handle initial connection error:');
//         throw err;
//     } 
// });

// ================global.Promise==================
mongoose.Promise = global.Promise;

mongoose.connect(
  DB_CONNECTION + '/' + DB_NAME, options)
  // Когда ошибки не возникает, выводим сообщение об успешном завершении работы на консоль.
  .then(() => console.log('Mongoose Successfully connected with promise!'))
  // Если при подключении к базе данных возникает ошибка, генерируется исключение и вся дальнейшая обработка прекращается.
  .catch((err) => console.error(err));

module.exports = mongoose;
