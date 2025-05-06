import React, { useEffect, useState } from 'react';
import API from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    API.get('/expenses')
      .then(res => {
        setExpenses(res.data);
      })
      .catch(err => {
        console.error('Error fetching expenses:', err);
      });
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ul>
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          expenses.map(expense => (
            <li key={expense.id}>
              {expense.expense_date} - {expense.category}: ₱{expense.amount}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
