"use strict";

var knex = require('../knex.js');

module.exports = {
  all: function all() {
    return knex('categories');
  },
  get: function get(id) {
    return knex('categories').where('id', parseInt(id)).first();
  },
  create: function create(category) {
    return knex('categories').insert({
      name: category.name
    }, 'id');
  }
};