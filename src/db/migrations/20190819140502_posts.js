
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(table){
      table.increments('id').primary();
      table.string('title').notNullable().unique();
      table.text('content').notNullable();
      table.integer('category_id').references('categories.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.dateTime('updated_at').nullable();
      table.dateTime('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts');
  };
 

