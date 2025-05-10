import React, { useState } from "react";
import { FiPlusCircle, FiCreditCard } from "react-icons/fi";
import { addExpense } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    expense_date: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(form);
      setForm({
        amount: "",
        category: "",
        description: "",
        expense_date: "",
      });
      // Display success message
      setSuccessMessage("Saved Successfully!"); 
      setTimeout(() => {
        setSuccessMessage(""); 
      }, 2000); 
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      {/* Page heading */}
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiPlusCircle className="mr-2" />
        Add Expense
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Card container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-md flex flex-col lg:flex-row gap-6"
      >
        {/* Left col */}
        <div className="flex-1 space-y-4">
          {/* Date picker */}
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input
              type="date"
              className="w-full p-2 rounded bg-[#F4F2F2]"
              value={form.expense_date}
              onChange={(e) =>
                setForm({ ...form, expense_date: e.target.value })
              }
              required
            />
          </div>

          {/* Category dropdown */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              className="w-full p-2 rounded bg-[#F4F2F2]"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Bills">Bills</option>
              <option value="Groceries">Groceries</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Amount input */}
          <div>
            <label className="block mb-1 font-semibold">Amount</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-[#F4F2F2]"
              placeholder="₱0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>

          {/* Note input */}
          <div>
            <label className="block mb-1 font-semibold">Note</label>
            <textarea
              className="w-full p-2 rounded bg-[#F4F2F2]"
              rows="4"
              placeholder="Enter a note"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col justify-between items-center flex-1">
          <FiCreditCard className="text-[120px] sm:text-[180px] lg:text-[240px] text-[#443627] mt-4" />

          {/* Save btn */}
          <button
            type="submit"
            className="bg-[#00FF40] text-[#443627] px-10 py-2 rounded-lg font-semibold shadow mt-6 w-full lg:w-auto hover:shadow-lg hover:bg-[#5CB338] hover:text-white transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
