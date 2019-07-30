const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

// ========================================
app.use('/static', express.static(__dirname + '/../public/assets'));

// Middleware  
app.use(function(req, res, next) {
    if (req.url == '/') {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    } else {
      next();
    }
});
  
// Middleware
app.use(function(req, res, next) {
    if (req.url == '/about') {
      res.sendFile(path.join(__dirname + '/../public/about.html'));
    } else {
      next();
    }
});

// Middleware
app.use(function(req, res, next) {
    if (req.url == '/contact') {
      res.sendFile(path.join(__dirname + '/../public/contact.html'));
    } else {
      next();
    }
});

//  Middleware будет всегда замыкать цепочку:
// app.use(function(req, res) {
//     res.status(404).end("<h1>What you want from me???</h1>");
// });

app.use(function(req, res) {
    res.status(404, {error: 'Sorry, we cannot find that!'});
    res.send({ some: '<h1>What you want from me???</h1>' });
    res.send('<h1>What you want from me???</h1>');
    res.status(500, { error: 'something blew up' }).end();
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
