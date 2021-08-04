//Will Contain REST API Handlers for ./leaders
const express = require('express');

//Express & Middleware Setup
const leaderRouter = express.Router();
leaderRouter.use(express.json()); //bodypParser was used in course but has been deprecated

//Declare endpoints at one single Leaders location instead of seperately
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})

.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

//Declare endpoints at one single Leaders:id location instead of seperately
leaderRouter.route('/:leaderId')

.all(function(req, res, next) {
res.writeHead(200, { 'Content-Type': 'text/plain'});
next();
})

.get(function(req, res, next) {
res.end('Will send details of the leader ' + req.params.leaderId + ' to you!');
})

.put(function(req, res, next) {
res.write('Updating the leader: ' + req.params.leaderId + '\n');
res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next) {
res.end('Deleting leader: ' + req.params.leaderId);
});

//Exports the module for use in other files
module.exports = leaderRouter;