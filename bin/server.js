// bin/server.js
'use strict';
require('dotenv').config();
const express = require('express');
const app = express();

app.use('/', require('../middlewares/app'));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on ${process.env.APP_PORT}`);
});