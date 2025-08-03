const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');
const proxy = require('./proxy/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/proxy', authMiddleware, (req, res) => {
    const { url } = req.body;
    proxy(url, req, res);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});