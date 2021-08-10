const express = require('express');
const cors = require('cors');
const app = express();

//contains all the origins that this server will accept
const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

var corsOptionsDelegate = (req, callback)=> {
    var corsOptions;

    //if the origin of the resource is in the whitelist, it will be accepted by the server
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin : true };
    } 
    else {
        corsOptions = { origin : false };
    }
    callback (null, corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);