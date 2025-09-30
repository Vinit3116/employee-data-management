// db/db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to SQLite database file
const dbPath = path.join(__dirname, "..", "data", "employees.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite DB at", dbPath);
});

// Create employees table if it doesn't exist
// This ensures old data is preserved and table is ready for CRUD operations
db.run(
  `CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL,
    salary REAL NOT NULL
  )`,
  (err) => {
    if (err) console.error("Table creation error:", err);
    else console.log("Employees table ready");
  }
);

module.exports = db; // Export DB connection for use in app.js
