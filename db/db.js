// db/db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use /tmp on Render (ephemeral) and local data folder on dev
const dbPath =
  process.env.RENDER
    ? path.join("/tmp", "employees.db")   // Render (writable but temporary)
    : path.join(__dirname, "..", "data", "employees.db"); // Local

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite DB at", dbPath);
});

// Table creation
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

module.exports = db;
