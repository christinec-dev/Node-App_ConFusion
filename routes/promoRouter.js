//Will Contain REST API Handlers for ./promotions
const express = require('express');

//Express & Middleware Setup
const promoRouter = express.Router();
promoRouter.use(express.json()); //bodypParser was used in course but has been deprecated

//Declare endpoints at one single Promotions location instead of seperately
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})

.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

//Declare endpoints at one single Promotions:id location instead of seperately
promoRouter.route('/:promoId')

.all(function(req, res, next) {
res.writeHead(200, { 'Content-Type': 'text/plain'});
next();
})

.get(function(req, res, next) {
res.end('Will send details of the promotion ' + req.params.promoId + ' to you!');
})

.put(function(req, res, next) {
res.write('Updating the promotion: ' + req.params.promoId + '\n');
res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next) {
res.end('Deleting promotion: ' + req.params.promoId);
});

//Exports the module for use in other files
module.exports = promoRouter;