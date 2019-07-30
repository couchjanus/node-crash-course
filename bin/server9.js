// bin/server9.js
'use strict';
const express = require('express');
const port = 3000;
const app = express();
const logger = require('../middlewares/logger');

app.use('/', require('../middlewares/app5'));

logger.info('Hello world');
logger.debug('Debugging info');

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
