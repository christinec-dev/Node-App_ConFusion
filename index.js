//Defines Core Modules
const express = require ('express');
const http = require ('http');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname="localhost";
const port = 3000;

//Express & Middleware Setup
const app = express();
app.use(morgan('dev'));
app.use(express.json()); //bodypParser was used in course but has been deprecated

//Express will fetch static html pages from this path
app.use(express.static(__dirname+ '/public'));

//Will forward dishes route to correct path
app.use('/dishes', dishRouter);

//Will forward promotions route to correct path
app.use('/promotions', promoRouter);

//Will forward leaders route to correct path
app.use('/leaders', leaderRouter);

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

