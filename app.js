// app.js

const express = require("express");
const db = require("./db/db");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

// GET all employees
app.get("/api/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET employee by ID
app.get("/api/employees/:id", (req, res) => {
  db.get("SELECT * FROM employees WHERE id=?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Employee not found" });
    res.json(row);
  });
});

// POST create employee
app.post(
  "/api/employees",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("position").notEmpty().withMessage("Position is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, position, salary } = req.body;
    const sql = "INSERT INTO employees (name,email,position,salary) VALUES (?,?,?,?)";
    db.run(sql, [name, email, position, salary], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM employees WHERE id=?", [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    });
  }
);

// PUT update employee
app.put(
  "/api/employees/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("position").notEmpty().withMessage("Position is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, position, salary } = req.body;
    const sql =
      "UPDATE employees SET name=?, email=?, position=?, salary=? WHERE id=?";
    db.run(sql, [name, email, position, salary, req.params.id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Employee not found" });
      db.get("SELECT * FROM employees WHERE id=?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
      });
    });
  }
);

// DELETE employee
app.delete("/api/employees/:id", (req, res) => {
  db.run("DELETE FROM employees WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = app;
    