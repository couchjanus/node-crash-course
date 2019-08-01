// bin/server2.js
'use strict';
const express = require('express');
const port = 3000;
const app = express();

app.use('/', require('../middlewares/app2'));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
