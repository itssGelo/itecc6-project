const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Add new expense
router.post('/add', (req, res) => {
  const { amount, category, description, expense_date, payment_method } = req.body;
  const sql = `INSERT INTO expense (amount, category, description, expense_date, payment_method) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [amount, category, description, expense_date, payment_method], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
});

// More functions (edit, delete, filter...) will go here.
module.exports = router;
