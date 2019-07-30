// bin/server4.js
const express = require('express');
const port = 3000;
const app = express();

app.use('/', require('../middlewares/app2'));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
