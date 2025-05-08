import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseManager from "./pages/ExpenseManager";
import MonthlySummary from "./pages/MonthlySummary";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Router>
      <div className="flex h-screen">
        <button
          className="md:hidden p-2 absolute top-2 left-2 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`fixed inset-y-0 left-0 z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:block transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-6 bg-[#F2F6D0] w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expense-manager" element={<ExpenseManager />} />
            <Route path="/monthly-summary" element={<MonthlySummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
