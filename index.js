//Defines Necessary Variables
const http = require ('http');
const hostname="localhost";
const port = 3000;

//Initialises Server Parameters
const server = http.createServer((req,res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello!</h1></body></html>')
});

//Executes Server Listener
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})