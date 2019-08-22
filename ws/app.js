'use strict'
const http = require('http');
const config = require('./config');

import app from './services/express';
const websocket = require('./services/ws');

const server = http.createServer(app);

server.listen(config.port, function () {
  console.log('Server listening on ' + (config.port));
  websocket(server);
});
