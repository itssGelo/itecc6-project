const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Add new expense with validation
router.post('/add', (req, res) => {
  const { amount, category, description, expense_date } = req.body;

  if (!amount || !category || !expense_date) {
    return res.status(400).json({ error: 'Amount, category, and expense date are required.' });
  }

  const sql = `INSERT INTO expense (amount, category, description, expense_date) VALUES (?, ?, ?, ?)`;
  db.query(sql, [amount, category, description, expense_date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
});

// 2. Get all expenses
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM expense ORDER BY expense_date DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 3. Update an expense with validation
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { amount, category, description, expense_date } = req.body;

  if (!amount || !category || !expense_date) {
    return res.status(400).json({ error: 'Amount, category, and expense date are required.' });
  }

  const sql = `
    UPDATE expense 
    SET amount = ?, category = ?, description = ?, expense_date = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [amount, category, description, expense_date, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Expense updated successfully' });
    }
  );
});

// 4. Delete an expense
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expense WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Expense deleted successfully' });
  });
});

module.exports = router;
