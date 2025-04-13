const express = require('express');
const router = express.Router();
const db = require('../db');
const logInCheck = require('../loggedInCheck');
const requireLogIn = require('../middleware/logInMiddleware');

router.post('/', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  const { task_id, scheduled_date, start_time, end_time } = req.body;
  db.run(
    `INSERT INTO scheduled_tasks (task_id, user_id, scheduled_date, start_time, end_time)
     VALUES (?, ?, ?, ?, ?)`,
    [task_id, userId, scheduled_date, start_time, end_time],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  db.all('SELECT * FROM scheduled_tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', requireLogIn, (req, res) => {
  const scheduledTaskId = req.params.id;
  const userId = logInCheck.getUserId();
  db.get('SELECT * FROM scheduled_tasks WHERE id = ?', [scheduledTaskId, userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Scheduled task not found' });
    res.json(row);
  });
});

router.put('/:id', requireLogIn, (req, res) => {
  const scheduledTaskId = req.params.id;
  const { start_time, end_time } = req.body;
  const userId = logInCheck.getUserId();
  db.run(
    `UPDATE scheduled_tasks SET start_time = ?, end_time = ? WHERE id = ?`,
    [start_time, end_time, scheduledTaskId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Scheduled task not found' });
      res.json({ message: 'Scheduled task updated' });
    }
  );
});

router.delete('/:id', requireLogIn, (req, res) => {
  const scheduledTaskId = req.params.id;
  const userId = logInCheck.getUserId();
  db.run('DELETE FROM scheduled_tasks WHERE id = ?', [scheduledTaskId, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Scheduled task not found' });
    res.json({ message: 'Scheduled task deleted' });
  });
});

module.exports = router;
