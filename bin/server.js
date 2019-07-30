const express = require('express');
const app = express();
const port = 3000;

// ========================================
app.get('/', (request, response) => {
  response.send('Hello from Express!');
});
// ========================================

const server = app.listen(port, () => {
}).on('listening', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}/`);
});

// ========================================
// const server = app.listen(port, () => {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log(`Server running at ${host}:${port}/`);
// });
// ========================================
// Perform a GET Request
// const options = {
//     host: 'localhost',
//     port: 3000,
// }

// const server = app.listen(options, () => {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log(`Server running at ${host}:${port}/`);
// })
// ========================================
// app.get("/", function(request, response){
//     response.send("<h1>Главная страница</h1>");
// });

// app.get("/about", function(request, response){
//     response.send("<h1>О сайте</h1>");
// });

// app.get("/contact", function(request, response){
//     response.send("<h1>Контакты</h1>");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on ${port}`);
// });

// ========================================

// app.get("/", function(request, response){
//     response.send("<h1>Главная страница</h1>");
// });

// app.get("/about", function(request, response){
//     response.send("<h1>О сайте</h1>");
// });

// app.get("/contact", function(request, response){
//     response.send("<h1>Контакты</h1>");
// });

// app.get('*', function(request, response){
//     // response.send('What you want from me???');
//     // response.status(404).end();
//     response.send('What you want from me???', 404);
// });

// app.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
// });

// ========================================

// const path = require('path');

// app.get("/", function(request, response){
//     response.sendFile(path.join(__dirname + '/../public/index.html'));
// });

// app.get("/about", function(request, response){
//     response.sendFile(path.join(__dirname + '/../public/about.html'));
// });

// app.get("/contact", function(request, response){
//     response.set('Content-Type', 'text/html');
//     response.set('Cache-control', 'no-cache');
//     response.status(200).sendFile(path.join(__dirname + '/../public/contact.html'));
// });

// app.get('*', function(request, response){
//     // response.send('What you want from me???');
//     // response.status(404).end();
//     response.status(404).send('What you want from me???');
// });

// app.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
// });
