exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'node'},
        {id: 2, name: 'postgresql'},
        {id: 3, name: 'knex'},
        {id: 4, name: 'javascript'}
      ]);
    });
};
