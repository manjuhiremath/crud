const http = require('http');

const server = http.createServer((req, res) => {
    const { url } = req;

    // Default header for all responses
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let responseMessage;

    // Handle different URL paths
    switch (url) {
        case '/home':
            responseMessage = '<h1>Welcome home</h1>';
            break;
        case '/about':
            responseMessage = '<h1>Welcome to About Us</h1>';
            break;
        case '/node':
            responseMessage = '<h1>Welcome to my Node Js project</h1>';
            break;
        default:
            // For other paths, set a 404 response
            res.writeHead(404, { 'Content-Type': 'text/html' }); // Only call this once for 404 response
            responseMessage = '<h1>Page Not Found</h1>';
            break;
    }

    // Send the response only once
    res.end(responseMessage);
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
