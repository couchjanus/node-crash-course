// bin/server.js
'use strict';
require('dotenv').config();
const express = require('express');
const app = express();

// =============Mongoose===================
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // we're connected!
//     console.log("we're connected!");
// });

// =============Collback===================
// const uri = 'mongodb://localhost/test';
// const options = {
//     useNewUrlParser: true
// };

// mongoose.connect(uri, options, (err) => {
//     // Check error in initial connection. 
//     // There is no 2nd param to the callback.    
//     if (err) {
//         console.error.bind(console, 'connection error:');
//         throw err;
//     }
//     console.log('Mongoose Successfully connected');    
// });

// =============Promise===================

// const uri = 'mongodb://localhost/test';
// const options = {
//     useNewUrlParser: true
// };

// mongoose.connect(uri, options).then(() => { 
//     // ready to use. 
//     // The `mongoose.connect()` promise resolves to undefined.  
//     console.log('The `mongoose.connect()` promise resolves to undefined');    
//     },
//     err => { 
//         // handle initial connection error
//         console.error.bind(console, 'handle initial connection error:');
//         throw err;
//     }
// );

// ================================

app.use('/', require('../middlewares/app'));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on ${process.env.APP_PORT}`);
});