const { createProxyMiddleware } = require('http-proxy-middleware');

const password = 'your_secure_password'; // Set your secure password here

const proxyMiddleware = (req, res, next) => {
    const { url, headers } = req;
    const providedPassword = headers['x-password'];

    if (providedPassword !== password) {
        return res.status(403).json({ error: 'Forbidden: Incorrect password' });
    }

    const targetUrl = url.split('/proxy/')[1]; // Extract the target URL from the request

    if (!targetUrl) {
        return res.status(400).json({ error: 'Bad Request: No target URL provided' });
    }

    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        onError: (err, req, res) => {
            res.status(500).json({ error: 'Proxy error', details: err.message });
        },
    })(req, res, next);
};

module.exports = proxyMiddleware;