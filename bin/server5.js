// bin/server5.js
const express = require('express');
const port = 3000;
const app = express();

app.use('/', require('../middlewares/app3'));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
