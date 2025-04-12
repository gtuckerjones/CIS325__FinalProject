const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, title, description, estimated_duration, due_date, priority } = req.body;
  db.run(
    `INSERT INTO tasks (user_id, title, description, estimated_duration, due_date, priority)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, title, description, estimated_duration, due_date, priority],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, estimated_duration, due_date, priority, is_complete } = req.body;
  db.run(
    `UPDATE tasks
     SET title = ?, description = ?, estimated_duration = ?, due_date = ?, priority = ?, is_complete = ?
     WHERE id = ?`,
    [title, description, estimated_duration, due_date, priority, is_complete, taskId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task updated' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
