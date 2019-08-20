const knex = require('../knex.js');

module.exports = {
    all: () => {
        return knex('categories');
    },
    get: (id) => {
        return knex('categories').where('id', parseInt(id)).first();
    },
    create: (category) => {
      return knex('categories').insert({name: category.name}, 'id');
    }
}
