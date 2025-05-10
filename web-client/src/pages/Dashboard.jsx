import React, { useEffect, useState } from "react";
import { FiHome, FiClock } from "react-icons/fi";
import { getExpenses } from "../services/api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(); 
        const data = response.data; 
        setExpenses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const parseAmount = (amount) => {
    const parsed = Number(amount);
    return isNaN(parsed) ? 0 : parsed;
  };

  const parseDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const isToday = (date) => {
    const today = new Date();
    const d = parseDate(date);
    return d.toDateString() === today.toDateString();
  };

  const isWithinLast7Days = (date) => {
    const d = parseDate(date);
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    return d >= sevenDaysAgo && d <= now;
  };

  const isLastMonth = (date) => {
    const d = parseDate(date);
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return (
      d.getMonth() === lastMonth.getMonth() &&
      d.getFullYear() === lastMonth.getFullYear()
    );
  };

  const todayTotal = expenses
    .filter((e) => isToday(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const weekTotal = expenses
    .filter((e) => isWithinLast7Days(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const lastMonthTotal = expenses
    .filter((e) => isLastMonth(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const overallTotal = expenses.reduce(
    (sum, e) => sum + parseAmount(e.amount),
    0
  );

  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiHome className="mr-2" />
        Dashboard
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-1">Today</h3>
          <hr />
          <p className="text-2xl font-bold">₱{todayTotal.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-1">7 Days Ago</h3>
          <hr />
          <p className="text-2xl font-bold">₱{weekTotal.toFixed(2)}</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-xl text-[#443627] shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-1">Last Month</h3>
          <hr />
          <p className="text-2xl font-bold">₱{lastMonthTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <FiClock className="text-2xl mr-2" />
          <h2 className="text-xl font-bold">Recent</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500">No expenses recorded.</p>
        ) : (
          <>
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
                  {/* Sort expenses in descending order based on date */}
                  {expenses
                    .sort((a, b) => parseDate(b.expense_date) - parseDate(a.expense_date))
                    .map((expense, index) => (
                      <tr
                        key={expense.id}
                        className={
                          index % 2 === 0 ? "bg-[#EBE9E9]" : "bg-[#D9D9D9]"
                        }
                      >
                        <td className="p-3">{expense.category}</td>
                        <td className="p-3">
                          ₱{parseAmount(expense.amount).toFixed(2)}
                        </td>
                        <td className="p-3">
                          {parseDate(expense.expense_date).toLocaleDateString()}
                        </td>
                        <td className="p-3">{expense.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="text-right font-bold mt-4 text-[#443627]">
              Total: ₱{overallTotal.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
