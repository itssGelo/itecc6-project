const express = require('express');
const app = express();
const expensesRoutes = require('./routes/expenses');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expensesRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
