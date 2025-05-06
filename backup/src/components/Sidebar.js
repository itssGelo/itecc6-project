import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul>
        <li>Dashboard</li>
        <li>Add Expense</li>
        <li>Expense Manager</li>
        <li>Monthly Summary</li>
      </ul>
    </div>
  );
}

export default Sidebar;
