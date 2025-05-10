import React, { useState, useEffect } from "react";
import { FiBarChart2, FiBarChart } from "react-icons/fi";
import { getExpenses } from "../services/api"; 

const MonthlySummary = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      const data = response.data;
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  let filteredExpenses = expenses.filter((expense) => {
  const rawDate = expense.expense_date;
  const expenseDate = new Date(rawDate); 
  const start = startDate ? new Date(startDate + "T00:00:00") : null;
  const end = endDate ? new Date(endDate + "T23:59:59") : null;

  return (
    (!start || expenseDate >= start) &&
    (!end || expenseDate <= end) &&
    (!categoryFilter || expense.category === categoryFilter)
  );
});

  if (amountSort === "low") {
    filteredExpenses.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  } else if (amountSort === "high") {
    filteredExpenses.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      {/* Page heading */}
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiBarChart2 className="mr-2" /> Monthly Summary
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <FiBarChart className="text-2xl mr-2" />
            <h2 className="text-xl font-bold">Summary</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-start">
            {/* Filter date */}
            <label className="font-semibold">From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-1 border rounded bg-[#F4F2F2] text-sm w-full sm:w-auto"
            />
            <label className="font-semibold ml-2">To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-1 border rounded bg-[#F4F2F2] text-sm w-full sm:w-auto"
            />

            {/* Filter categories */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-1 rounded bg-[#F4F2F2] border text-sm w-full sm:w-auto"
            >
              <option value="">All Categories</option>
              <option value="Bills">Bills</option>
              <option value="Groceries">Groceries</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
            </select>
            <select
              value={amountSort}
              onChange={(e) => setAmountSort(e.target.value)}
              className="p-1 rounded bg-[#F4F2F2] border text-sm w-full sm:w-auto"
            >
              <option value="">Sort by Amount</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[350px]">
          <table className="min-w-full text-left">
            <thead className="sticky top-0 z-10 bg-gray-300">
              <tr>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-[#EBE9E9]" : "bg-[#D9D9D9]"}
                >
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">{new Date(expense.expense_date).toLocaleDateString()}</td>
                  <td className="p-3">₱{parseFloat(expense.amount).toFixed(2)}</td>
                  <td className="p-3">{expense.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end mt-4 font-semibold text-lg">
          Total: ₱{totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
