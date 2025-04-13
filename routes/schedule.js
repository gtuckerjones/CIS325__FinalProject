const express = require('express');
const router = express.Router();
const db = require('../db');
const logInCheck = require('../loggedInCheck');
const requireLogIn = require('../middleware/logInMiddleware');

router.post('/', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  const { day_of_week, start_time, end_time, description } = req.body;
  db.run(
    `INSERT INTO weekly_schedule (user_id, day_of_week, start_time, end_time, description)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, day_of_week, start_time, end_time, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/', requireLogIn, (req, res) => {
  const userId = logInCheck.getUserId();
  db.all('SELECT * FROM weekly_schedule WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', requireLogIn, (req, res) => {
  const scheduleId = req.params.id;
  const userId = logInCheck.getUserId();
  db.get('SELECT * FROM weekly_schedule WHERE id = ?', [scheduleId, userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Schedule entry not found or unauthorized' });
    res.json(row);
  });
});

router.put('/:id', requireLogIn, (req, res) => {
  const scheduleId = req.params.id;
  const userId = logInCheck.getUserId();
  const { day_of_week, start_time, end_time, description } = req.body;
  db.run(
    `UPDATE weekly_schedule SET day_of_week = ?, start_time = ?, end_time = ?, description = ?
     WHERE id = ? AND user_id = ?`,
    [day_of_week, start_time, end_time, description, scheduleId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Schedule entry not found' });
      res.json({ message: 'Schedule entry updated' });
    }
  );
});

router.delete('/:id', requireLogIn, (req, res) => {
  const scheduleId = req.params.id;
  const userId = logInCheck.getUserId();
  db.run('DELETE FROM weekly_schedule WHERE id = ? AND user_id = ?', [scheduleId, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Schedule entry not found' });
    res.json({ message: 'Schedule entry deleted' });
  });
});

module.exports = router;
