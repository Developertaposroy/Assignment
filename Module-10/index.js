
// Task 1: Mongoose Schema and Model

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Task 2: Express.js Route

const express = require('express');
const Product = require('./models/Product');

const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}, 'name price');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Task 3: JSON Web Tokens (JWT)

const jwt = require('jsonwebtoken');

function generateToken(userId, secretKey) {
    const payload = { userId };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
}

module.exports = generateToken;


// Task 4: Express.js Middleware

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = authenticate;













