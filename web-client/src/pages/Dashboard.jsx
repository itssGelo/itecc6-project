import React from "react";
import { FiHome, FiClock } from "react-icons/fi";

const Dashboard = () => {
  const recentExpenses = [
    {
      category: "Bills",
      amount: 1000,
      date: "5/5/2025",
      note: "Electric bills",
    },
    {
      category: "Groceries",
      amount: 750,
      date: "5/4/2025",
      note: "Weekly shopping",
    },
    {
      category: "Transport",
      amount: 300,
      date: "5/3/2025",
      note: "Gas refill",
    },
    { category: "Dining", amount: 450, date: "5/2/2025", note: "Dinner out" },
    {
      category: "Internet",
      amount: 1200,
      date: "5/1/2025",
      note: "Monthly fee",
    },
  ];

  const total = recentExpenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      {/* Page heading */}
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiHome className="mr-2" />
        Dashboard
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      {/* Card container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          {/* Today */}
          <h3 className="text-lg font-semibold mb-1">Today</h3>
          <hr />
          <p className="text-2xl font-bold">₱0.00</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          {/* Week */}
          <h3 className="text-lg font-semibold mb-1">7 Days Ago</h3>
          <hr />
          <p className="text-2xl font-bold">₱0.00</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          {/* Month */}
          <h3 className="text-lg font-semibold mb-1">Last Month</h3>
          <hr />
          <p className="text-2xl font-bold">₱0.00</p>
        </div>
      </div>

      {/* Recent expenses card */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <FiClock className="text-2xl mr-2" />
          <h2 className="text-xl font-bold">Recent</h2>
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[200px]">
          <table className="min-w-full text-left">
            <thead className="sticky top-0 bg-gray-300 z-10">
              <tr>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-[#EBE9E9]" : "bg-[#D9D9D9]"}
                >
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">₱{expense.amount.toFixed(2)}</td>
                  <td className="p-3">{expense.date}</td>
                  <td className="p-3">{expense.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="text-right font-bold mt-4 text-[#443627]">
          Total: ₱{total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
