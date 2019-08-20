"use strict";

var knex = require('./knex.js');

function Posts() {
  return knex('posts');
} // *** queries *** //


function getAll() {
  return Posts().select();
}

function get(postID) {
  return Posts().where('id', parseInt(postID)).first();
}

function add(post) {
  return Posts().insert({
    title: post.title,
    content: post.content
  }, 'id'); // return Posts().insert(post, 'id');
}

function update(postID, post) {
  return Posts().where('id', parseInt(postID)).update({
    title: post.title,
    content: post.content
  });
}

function deleteItem(postID) {
  return Posts().where('id', parseInt(postID)).del();
}

module.exports = {
  getAll: getAll,
  get: get,
  add: add,
  update: update,
  deleteItem: deleteItem
};