const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {

    const basePath = path.join(__dirname); // only dirname because my server is inside the same foulder with html, css and JS files
    const filePath = req.url === '/' ? path.join(basePath, 'index.html') : path.join(basePath, req.url);

    console.log('Serving', filePath); // just to see where is the filepath going

    const extname = String(path.extname(filePath).toLowerCase()); // extname finds what extention is the last file in filepath(in this case html)

    const mimeTypes = { // all the types that I want to be used
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.ico': 'image/x-icon',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if(err) {
            res.writeHead(404, { 'Content-Type' : 'text/plain' });
            res.end('404 not found');
        } else {
            res.writeHead(200, { 'Content-Type' : contentType })
            res.end(content, 'utf-8');
        }
    })
});    

server.listen(port, function(error) {
    if(error){
        console.error(error);
    } else {
        console.log(`Listening for request on port ${port}`);
    } 
});
