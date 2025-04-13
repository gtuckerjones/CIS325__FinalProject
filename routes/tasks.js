const express = require('express');
const router = express.Router();
const db = require('../db');
const logInCheck = require('../loggedInCheck');
const requireLogIn = require('../middleware/logInMiddleware');

router.post('/', requireLogIn, (req, res) => {
  const { title, description, estimated_duration, due_date, priority } = req.body;
  const userId = logInCheck.getUserId();
  db.run(
    `INSERT INTO tasks (user_id, title, description, estimated_duration, due_date, priority)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, description, estimated_duration, due_date, priority],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', requireLogIn, (req, res) => {
  const taskId = req.params.id;
  const userId = logInCheck.getUserId();
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId, userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

router.put('/:id', requireLogIn, (req, res) => {
  const taskId = req.params.id;
  const userId = logInCheck.getUserId();
  const { title, description, estimated_duration, due_date, priority, is_complete } = req.body;
  db.run(
    `UPDATE tasks
     SET title = ?, description = ?, estimated_duration = ?, due_date = ?, priority = ?, is_complete = ?
     WHERE id = ? AND user_id = ?`,
    [title, description, estimated_duration, due_date, priority, is_complete, taskId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task updated' });
    }
  );
});

router.delete('/:id', requireLogIn, (req, res) => {
  const taskId = req.params.id;
  const userId = logInCheck.getUserId();
  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
