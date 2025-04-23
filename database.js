const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

// Connect to the SQLite database
const db = new sqlite3.Database('./cis325.sqlite3', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    mainMenu(); // Start the main menu
  }
});

// Utility functions for database operations
const Database = {
  run: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  },

  get: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  all: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  listTables: () => {
    return Database.all("SELECT name FROM sqlite_master WHERE type='table'");
  },

  close: () => {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main menu for user interaction
function mainMenu() {
  console.log('\nWhat would you like to do?');
  console.log('1. View Tables');
  console.log('2. View Data');
  console.log('3. Add Data');
  console.log('4. Edit Data');
  console.log('5. Delete Data');
  console.log('6. Exit');

  rl.question('Enter your choice: ', async (choice) => {
    switch (choice) {
      case '1':
        await viewTables();
        break;
      case '2':
        await viewData();
        break;
      case '3':
        await addData();
        break;
      case '4':
        await editData();
        break;
      case '5':
        await deleteData();
        break;
      case '6':
        console.log('Goodbye!');
        rl.close();
        await Database.close();
        return;
      default:
        console.log('Invalid choice. Please try again.');
    }
    mainMenu();
  });
}

// View all tables in the database
async function viewTables() {
  try {
    const tables = await Database.listTables();
    console.log('\nTables in the database:');
    tables.forEach((table) => console.log(`- ${table.name}`));
  } catch (err) {
    console.error('Error fetching tables:', err.message);
  }
}

// View data from a specific table
async function viewData() {
  rl.question('Enter the table name to view data: ', async (tableName) => {
    try {
      const data = await Database.all(`SELECT * FROM ${tableName}`);
      console.log(`\nData from table "${tableName}":`);
      console.table(data);
    } catch (err) {
      console.error('Error fetching data:', err.message);
    }
    mainMenu();
  });
}

// Add data to a specific table
async function addData() {
  rl.question('Enter the table name to add data: ', async (tableName) => {
    rl.question('Enter the column names (comma-separated): ', (columns) => {
      rl.question('Enter the values (comma-separated): ', async (values) => {
        try {
          const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values
            .split(',')
            .map(() => '?')
            .join(',')})`;
          const params = values.split(',');
          await Database.run(query, params);
          console.log('Data added successfully.');
        } catch (err) {
          console.error('Error adding data:', err.message);
        }
        mainMenu();
      });
    });
  });
}

// Edit data in a specific table
async function editData() {
  rl.question('Enter the table name to edit data: ', async (tableName) => {
    rl.question('Enter the column to update: ', (column) => {
      rl.question('Enter the new value: ', (newValue) => {
        rl.question('Enter the condition (e.g., id=1): ', async (condition) => {
          try {
            const query = `UPDATE ${tableName} SET ${column} = ? WHERE ${condition}`;
            await Database.run(query, [newValue]);
            console.log('Data updated successfully.');
          } catch (err) {
            console.error('Error updating data:', err.message);
          }
          mainMenu();
        });
      });
    });
  });
}

// Delete data from a specific table
async function deleteData() {
  rl.question('Enter the table name to delete data: ', async (tableName) => {
    rl.question('Enter the condition (e.g., id=1): ', async (condition) => {
      try {
        const query = `DELETE FROM ${tableName} WHERE ${condition}`;
        await Database.run(query);
        console.log('Data deleted successfully.');
      } catch (err) {
        console.error('Error deleting data:', err.message);
      }
      mainMenu();
    });
  });
}

module.exports = Database;