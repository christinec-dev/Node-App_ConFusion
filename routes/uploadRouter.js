const express = require('express');
var authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

//sets config for storing files (where and as what)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

//filters which file types can be uploaded
const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/|.(jpg|jpeg}png|gif)$/)) {
        return cb(new Error('You can only upload image files!'), false);
    }
    cb(null, true);
};

//defines upload multer function
const upload = multer({storage: storage, fileFilter: imageFileFilter})

//configs upload router
const uploadRouter = express.Router();
uploadRouter.use(express.json()); 

//Configs post, get, put and delete requests when the user wants to upload files
uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })

    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    })

module.exports = uploadRouter;