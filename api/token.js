const { User } = require("../db");
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'CACESTDUSECRET';
app.use(express.json());

app.use(async (req, res, next) => {
    console.log("je passe dans token");
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        req.user = null;
        next();
    }
    else {
        const { sub } = jwt.verify(token, TOKEN_SECRET);
        req.user = await User.findByPk(sub);
        next();
    }
})

app.post('/token', (req, res) => {
    // validation username + password
    let id = req.body.id
    const token = generateAccessToken({sub: id});
    return res.status(201).json(token);
})

app.get('/user', authenticateToken, (req, res) => {
    return res.status(200).json(req.user);
});

function generateAccessToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET/*, { expiresIn: '1800s' }*/);
}

function authenticateToken(req, res, next) {
    req.user ? next() : res.status(401).json({ "msg" : "Unauthorized" });
}

module.exports.app = app;
module.exports.authenticateToken = authenticateToken;