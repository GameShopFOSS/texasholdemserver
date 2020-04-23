const express = require('express')
const app = express()
//const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/goodbye', (req, res) => res.send('Goodbye World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))