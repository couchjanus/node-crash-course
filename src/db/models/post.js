const knex = require('../knex.js');

module.exports = {
  all: () => {
      return knex('posts');
  },
  get: (id) => {
      return knex('posts').where('posts.id', parseInt(id)).innerJoin('categories', {'categories.id':'category_id'}).first();
  },
  create: (post) => {
    return knex('posts').insert({title: post.title, content: post.content, category_id: post.category_id }, 'id');
  },
  update: (id, post) => {
    return knex('posts').where('id', parseInt(id)).update({title: post.title, content: post.content, category_id: post.category_id });
  },
  delete: (id) => {
    return knex('posts').where('id', parseInt(id)).del();
  }
}
