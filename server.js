const http = require('http');
const fs = require('fs');
const path = require('path');
const handleEvents = require('./api/events');

const PORT = 5500;

// Supported MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // 1. Backend Proxy for Ticketmaster Events API (delegates to api/events.js)
  if (req.url.startsWith('/api/events')) {
    handleEvents(req, res);
    return;
  }

  // 2. Safely parse and decode request path
  let safeReqPath;
  try {
    const rawUrlPath = req.url.split('?')[0];
    safeReqPath = decodeURI(rawUrlPath === '/' ? '/index.html' : rawUrlPath);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 - Bad Request');
    return;
  }

  // 3. Resolve path and apply robust path traversal protection
  const resolvedPath = path.resolve(__dirname, '.' + safeReqPath);
  const relativePath = path.relative(__dirname, resolvedPath);

  // If relative path points to parent or is absolute, it points outside the project root
  if (relativePath === '..' || relativePath.startsWith('..' + path.sep) || path.isAbsolute(relativePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 - Forbidden');
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();

  // 4. Return 404 for missing static assets (CSS, JS, images, fonts)
  if (ext && ext !== '.html') {
    if (!fs.existsSync(resolvedPath) || fs.statSync(resolvedPath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not Found');
      return;
    }
  }

  // 5. SPA route fallback: serve index.html for extensionless navigation routes
  let filePath = resolvedPath;
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const fileExt = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[fileExt] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

module.exports = server;
