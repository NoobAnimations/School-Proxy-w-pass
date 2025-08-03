const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Password middleware for /proxy routes
app.use((req, res, next) => {
  if (
    req.path.startsWith('/proxy') ||
    req.path === '/proxy' ||
    req.path === '/proxy/'
  ) {
    const password = req.headers['x-proxy-password'] || req.query.password;
    if (password !== '3008') {
      return res.status(401).send('Unauthorized: Invalid password');
    }
  }
  next();
});

// Proxy endpoint
app.use('/proxy', (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL parameter required');
  }

  // Create and use the proxy middleware
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '',
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      );
    },
    onError: (err, req, res) => {
      res.status(500).send('Proxy error: ' + err.message);
    },
    onProxyRes: (proxyRes, req, res) => {
      // You can modify proxyRes here if needed
    }
  })(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});