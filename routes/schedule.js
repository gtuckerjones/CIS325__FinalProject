const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, day_of_week, start_time, end_time, description } = req.body;
  db.run(
    `INSERT INTO weekly_schedule (user_id, day_of_week, start_time, end_time, description)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, day_of_week, start_time, end_time, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.get('/user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  db.all('SELECT * FROM weekly_schedule WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const scheduleId = req.params.id;
  db.get('SELECT * FROM weekly_schedule WHERE id = ?', [scheduleId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Schedule entry not found' });
    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const scheduleId = req.params.id;
  const { day_of_week, start_time, end_time, description } = req.body;
  db.run(
    `UPDATE weekly_schedule SET day_of_week = ?, start_time = ?, end_time = ?, description = ?
     WHERE id = ?`,
    [day_of_week, start_time, end_time, description, scheduleId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Schedule entry not found' });
      res.json({ message: 'Schedule entry updated' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const scheduleId = req.params.id;
  db.run('DELETE FROM weekly_schedule WHERE id = ?', [scheduleId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Schedule entry not found' });
    res.json({ message: 'Schedule entry deleted' });
  });
});

module.exports = router;
