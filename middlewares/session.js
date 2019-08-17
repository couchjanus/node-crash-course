const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config');

const store = new MongoDBStore({
  uri: config.mongo.connection+"/"+config.session.db,
  collection: config.session.collection
});

module.exports = session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      path: "/",
      httpOnly: true,
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
});
