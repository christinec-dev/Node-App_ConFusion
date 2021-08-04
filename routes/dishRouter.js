//Will Contain REST API Handlers for ./dishes
const express = require('express');

//Express & Middleware Setup
const dishRouter = express.Router();
dishRouter.use(express.json()); //bodypParser was used in course but has been deprecated

//Declare endpoints at one single Dishes location instead of seperately
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})

.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

//Declare endpoints at one single Dishes:id location instead of seperately
dishRouter.route('/:dishId')

.all(function(req, res, next) {
res.writeHead(200, { 'Content-Type': 'text/plain'});
next();
})

.get(function(req, res, next) {
res.end('Will send details of the dish ' + req.params.dishId + ' to you!');
})

.put(function(req, res, next) {
res.write('Updating the dish: ' + req.params.dishId + '\n');
res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next) {
res.end('Deleting dish: ' + req.params.dishId);
});

//Exports the module for use in other files
module.exports = dishRouter;