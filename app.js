const http = require('http');
const port = 3000;
const hostname = 'localhost';

// const server = http.createServer((req, res) => {
//   // the same kind of magic happens here!
//   res.statusCode = 200;
//   res.statusCode = 404; // Сообщаем клиенту, что ресурс не найден.
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('X-Powered-By', 'bla bla bla');
//   res.end();
// }).listen(port);

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     // 'Content-Type': 'application/json',
//     'Content-Type': 'text/plain',
//     'X-Powered-By': 'bla bla bla'
//   });

//   res.write('<html>');
//   res.write('<body>');
//   res.write('<h1>Hello, World!</h1>');
//   res.write('</body>');
//   res.write('</html>');
//   res.end();
// }).listen(port);

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<html><body><h1>Hello, World!</h1></body></html>');
// }).listen(port);

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<html><body><h1>Hello, World!</h1></body></html>');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });