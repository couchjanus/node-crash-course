// bin/server1.js
'use strict';
const express = require('express');
const port = 3000;
const app = express();

const MongoClient = require('mongodb').MongoClient;

app.use('/', require('../middlewares/app'));

const URL = 'mongodb://localhost:27017';

MongoClient.connect(URL, {useNewUrlParser:true}, (err, client) => {

  if (err) { 
    return console.log(err);
  }
  
  const db = client.db('peculiar');

  console.log('Connected correctly to server.');
  
  let collections = db.collection('posts');
  
  collections.insertOne({title: 'First Post', updated_at: new Date(),content:'Exercitationem in occaecati. Sed ut et inventore ipsa. Est officia autem harum. Fugiat voluptas facere.'}, (err, result) => {
    collections.find({title: 'First Post'}).toArray((err, docs) => {
      console.log(docs[0]);
      client.close();
    });
  });
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
