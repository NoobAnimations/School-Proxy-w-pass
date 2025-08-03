const expectedPassword = 'your_secure_password'; // Replace with your actual password

const authMiddleware = (req, res, next) => {
    const { password } = req.body;

    if (password === expectedPassword) {
        next(); // Password is correct, proceed to the next middleware
    } else {
        res.status(403).json({ error: 'Forbidden: Incorrect password' }); // Password is incorrect
    }
};

module.exports = authMiddleware;