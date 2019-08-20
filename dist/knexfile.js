"use strict";

var config = require('./config');

var pg = require('pg');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mocha_chai_tv_shows_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: config.host,
      database: config.database,
      user: config.user,
      password: config.password
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: config.host,
      database: config.database,
      user: config.user,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};