const express = require('express');
const router = express.Router();
const db = require('../db');
const logInCheck = require('../loggedInCheck');

//Register
router.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required'});
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email)) {
        return res.status(400).json({ error: 'Invalid email format'});
    }

    const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordCheck.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one number and one special character and be at least 6 characters long' });
    }

    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.get(checkQuery, [email], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        if (row) return res.status(400).json({ error: 'Email already exists'});

        const insertQuery = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)';
        db.run(insertQuery, [firstName, lastName, email, password], function (err) {
            if (err) return res.status(500).json({ error: err.message});
            res.status(201).json({ message: 'User registered', userId: this.lastID});
        });
    });
});

//Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(query, [email, password], (err, user) => {
        if (err) return res.status(500).json({error: err.message});
        if (!user) return res.status(401).json({ error: 'Invalid credentials'});

        logInCheck.setUserId(user.id);

        res.json({
            message: 'You have logged in',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    });
});

//Logout
router.post('/logout', (req, res) => {
    logInCheck.clearUser();
    res.json({message: 'You have logged out'});
});

module.exports = router;