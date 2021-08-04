//Defines Core Modules
const express = require ('express');
const http = require ('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const hostname="localhost";
const port = 3000;

//Express & Middleware Setup
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json);

//Specifies REST API Endpoints
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

//REST API Handler Request Examples
app.get('/dishes' , (req, res, next) => {
    res.end('Will send all the data to you!')
});

app.post('/dishes' , (req, res, next) => {
    res.end('Will add the data: ' + req.body.name + ' with details: ' + req.body.description)
});

app.put('/dishes' , (req, res, next) => {
    res.statusCode = 403;
    res.end('Operation Not Supported')
});

app.delete('/dishes' , (req, res, next) => {
    res.end('Deleting all data!')
});
app.get('/dishes/:dishId' , (req, res, next) => {
    res.end('Will send the data: ' + req.params.dishId)
});

app.post('/dishes/:dishId' , (req, res, next) => {
    res.end('Operation Not Supported' + req.params.dishId)
});

app.put('/dishes/:dishId' , (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end('Updating dish with details: ' + req.body.name + req.body.description);
});

app.delete('/dishes/:dishId' , (req, res, next) => {
    res.end('Deleting the dish: ' + req.params.dishId)
});

//Express will fetch static html pages from this path
app.use(express.static(__dirname+ '/public'));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); 
});

//Creates Server
const server = http.createServer(app);

//Executes Server Listener
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});

