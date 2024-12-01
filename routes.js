
const fs = require('fs');
const { parse } = require('querystring');
const routes =(req,res)=>{
    if (req.method === 'GET') {
        // Serve the HTML form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <form action="/submit" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <br>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                <br>
                <button type="submit">Submit</button>
            </form>
        `);
    } else if (req.method === 'POST' && req.url === '/submit') {
        // Collect form data using streams
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = parse(body);

            // Write data to a file
            const outputStream = fs.createWriteStream('output.txt', { flags: 'a' });
            outputStream.write(`Name: ${parsedData.name}\nMessage: ${parsedData.message}\n\n`);
            outputStream.end();

            // Redirect user with 302 status
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if (req.method === 'GET' && req.url === '/read') {
        // Read data from the file and display it
        fs.readFile('output.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else {
        // Handle 404 for unknown routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
}

module.exports = routes;