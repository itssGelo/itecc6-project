// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'expense_tracker'
// });

// db.connect(err => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// app.get('/expenses', (req, res) => {
//   db.query('SELECT * FROM expense', (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
