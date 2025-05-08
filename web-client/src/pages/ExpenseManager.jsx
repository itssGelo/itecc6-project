import React, { useState } from "react";
import { FiSettings, FiList } from "react-icons/fi";
import EditCard from "../components/EditCard";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([
    {
      category: "Bills",
      amount: 1000,
      date: "2025-05-05",
      note: "Electric bills",
    },
    {
      category: "Groceries",
      amount: 750,
      date: "2025-05-04",
      note: "Weekly shopping",
    },
    {
      category: "Transport",
      amount: 300,
      date: "2025-05-03",
      note: "Gas refill",
    },
    {
      category: "Transport",
      amount: 300,
      date: "2025-05-03",
      note: "Gas refill",
    },
    {
      category: "Transport",
      amount: 300,
      date: "2025-05-03",
      note: "Gas refill",
    },
    {
      category: "Transport",
      amount: 300,
      date: "2025-05-03",
      note: "Gas refill",
    },
  ]);

  const [editingExpense, setEditingExpense] = useState(null);
  const [sortCategory, setSortCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const getSortedExpenses = () => {
    let filtered = [...expenses];

    if (sortCategory !== "All") {
      filtered = filtered.filter(
        (exp) => exp.category.toLowerCase() === sortCategory.toLowerCase()
      );
    }

    if (sortOption === "amountAsc") {
      filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === "amountDesc") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === "dateAsc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "dateDesc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  };

  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiList className="mr-2" />
        Expense Manager
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      {/* Card */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          {/* Title */}
          <div className="flex items-center">
            <FiSettings className="text-2xl mr-2" />
            <h2 className="text-xl font-bold">Manage</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
            {/* Category sort */}
              <label className="font-medium mr-2">Sort by Category:</label>
              <select
                value={sortCategory}
                onChange={(e) => setSortCategory(e.target.value)}
                className="p-1 border rounded bg-[#F4F2F2] text-sm w-full sm:w-auto"
              >
                <option value="All">All</option>
                <option value="Bills">Bills</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                {/* Sort, date and amount */}
              <label className="font-medium mr-2">Filter:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-1 border rounded bg-[#F4F2F2] text-sm w-full sm:w-auto"
              >
                <option value="">None</option>
                <option value="dateAsc">Date (Old to New)</option>
                <option value="dateDesc">Date (New to Old)</option>
                <option value="amountAsc">Amount (Low to High)</option>
                <option value="amountDesc">Amount (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-[350px]">
            <table className="min-w-full text-left text-sm md:text-base">
              <thead className="sticky top-0 bg-gray-300 z-10">
                <tr>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Note</th>
                  <th className="p-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {getSortedExpenses().map((expense, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-[#EBE9E9]" : "bg-[#D9D9D9]"
                    }
                  >
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3">₱{expense.amount.toFixed(2)}</td>
                    <td className="p-3">{expense.date}</td>
                    <td className="p-3">{expense.note}</td>
                    <td className="p-3 space-y-1 sm:space-x-2 sm:space-y-0 flex flex-col sm:flex-row">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => setEditingExpense({ ...expense, index })}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit card */}
      {editingExpense && (
        <EditCard
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={(updated) => {
            const updatedExpenses = [...expenses];
            updatedExpenses[editingExpense.index] = updated;
            setExpenses(updatedExpenses);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
};

export default ExpenseManager;
