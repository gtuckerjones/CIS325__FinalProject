const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cis325.sqlite3', (err) => {
  if (err) return console.error('DB Connection Error:', err.message);
  console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS weekly_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            day_of_week INTEGER,            -- 0 = Sunday, 6 = Saturday
            start_time TEXT,                -- "HH:MM" 24hr format
            end_time TEXT,
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            estimated_duration INTEGER,     -- in minutes
            due_date TEXT,                  -- ISO date format: YYYY-MM-DD
            priority INTEGER DEFAULT 1,     -- 1 = Low, 2 = Medium, 3 = High
            is_complete INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS scheduled_tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER,
            user_id INTEGER,
            scheduled_date TEXT,            -- YYYY-MM-DD
            start_time TEXT,                -- HH:MM
            end_time TEXT,
            FOREIGN KEY (task_id) REFERENCES tasks(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);
  });

  module.exports = db;