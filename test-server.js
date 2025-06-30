const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Test Server Working</h1>
        <p>This means your localhost setup is working fine.</p>
        <p>The issue might be with Next.js specifically.</p>
      </body>
    </html>
  `);
});

server.listen(3001, 'localhost', () => {
  console.log('Test server running at http://localhost:3001');
});