const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { userName, email, password } = req.body;
  db.run(
    `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`,
    [userName, email, password], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { userName, email, password } = req.body;
  db.run(
    `UPDATE users SET userName = ?, email = ?, password = ? WHERE id = ?`,
    [userName, email, password, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
