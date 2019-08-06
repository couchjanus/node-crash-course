// bin/server.js
'use strict';
require('dotenv').config();
const express = require('express');
const app = express();

app.use('/', require('../middlewares/app'));

// const MongoClient = require('mongodb').MongoClient;

// const URL = 'mongodb://localhost:27017';

// // Для подключения к серверу применяется метод connect():
// MongoClient.connect(URL, {useNewUrlParser:true}, (err, client) => {
//     // Если ошибки нет, можем взаимодействовать с сервером через объект client.
//     console.log('Connected correctly to server.');      
//     // Если при подключении возникли ошибки, то мы можем использовать значение err для получения ошибки.
//     if (err) { 
//         return console.log(err);
//     }
//     // Закрытие соединения с базой данных
//     client.close();
// });
        
// MongoClient.connect(URL, {useNewUrlParser:true}, (err, client) => {
//   if (err) { 
//     return console.log(err);
//   }
//   const db = client.db('peculiar');
//   console.log('Connected correctly to server.');
//   let collections = db.collection('posts');
//   collections.insertOne({title: 'First Post', updated_at: new Date(),content:'Exercitationem in occaecati. Sed ut et inventore ipsa. Est officia autem harum. Fugiat voluptas facere.'}, (err, result) => {
//     collections.find({title: 'First Post'}).toArray((err, docs) => {
//       console.log(docs[0]);
//       client.close();
//     });
//   });
// });

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on ${process.env.APP_PORT}`);
});