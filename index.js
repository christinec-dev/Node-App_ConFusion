//Defines Necessary Variables
const http = require ('http');
const fs = require('fs');
const path = require('path');
const hostname="localhost";
const port = 3000;

//Initialises Server Parameters
const server = http.createServer((req,res) => {
    console.log("Request for " + req.url + " by method " + req.method);

    //If it doesn't get a specified path it will auto redirect to index.html
    if (req.method == 'GET') {
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        
        //if the file is not an html extension, it will not redirect to index.html but would give a 404 response
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html') {
            fs.exists(filePath, (exists) =>{
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: file not found.</h1></body></html>');

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        } 
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not a HTML file</h1></body></html>'); 
            
            return;
        }
    } 
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>'); 
        
        return;
    }

});

//Executes Server Listener
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})