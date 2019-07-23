const http = require('http');
const port = 3000;
const hostname = 'localhost';

module.exports = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
}).listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
