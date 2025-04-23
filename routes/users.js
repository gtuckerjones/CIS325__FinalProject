/*
const express = require('express');
const router = express.Router();
const db = require('../db');
const logInCheck = require('../loggedInCheck');
const requireLogIn = require('../middleware/logInMiddleware');

router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  db.run(
    `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, password], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/me', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  db.get('SELECT id, firstName, lastName, email FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

router.put('/me', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  const { firstName, lastName, email, password } = req.body;
  db.run(
    `UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`,
    [firstName, lastName, email, password, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated' });
    }
  );
});

router.delete('/me', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
*/