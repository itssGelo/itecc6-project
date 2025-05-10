import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/expenses',
});

// Get all expenses
export const getExpenses = () => API.get('/');

// Add a new expense
export const addExpense = (expense) => API.post('/add', expense);

// Update an expense
export const updateExpense = (id, expense) => API.put(`/update/${id}`, expense);

// Delete an expense
export const deleteExpense = (id) => API.delete(`/delete/${id}`);
