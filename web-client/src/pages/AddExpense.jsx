import React from "react";
import { FiPlusCircle, FiCreditCard } from "react-icons/fi";

const AddExpense = () => {
  return (
    <div className="pr-6 pl-6 text-[#443627] min-h-screen overflow-x-hidden">
      {/* Page heading */}
      <h1 className="text-3xl font-bold flex items-center mb-2">
        <FiPlusCircle className="mr-2" />
        Add Expense
      </h1>
      <hr className="border-t-2 border-[#443627] mb-6" />

      {/* Card container */}
      <div className="bg-white rounded-xl p-6 shadow-md flex flex-col lg:flex-row gap-6">
        {/* Left col */}
        <div className="flex-1 space-y-4">
          {/* Date picker */}
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input type="date" className="w-full p-2 rounded bg-[#F4F2F2]" />
          </div>

          {/* Category dropdown */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select className="w-full p-2 rounded bg-[#F4F2F2]">
              <option>Bills</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Others</option>
            </select>
          </div>

          {/* Amount input */}
          <div>
            <label className="block mb-1 font-semibold">Amount</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-[#F4F2F2]"
              placeholder="₱0.00"
            />
          </div>

          {/* Note input */}
          <div>
            <label className="block mb-1 font-semibold">Note</label>
            <textarea
              className="w-full p-2 rounded bg-[#F4F2F2]"
              rows="4"
              placeholder="Enter a note"
            ></textarea>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col justify-between items-center flex-1">
          <FiCreditCard className="text-[120px] sm:text-[180px] lg:text-[240px] text-[#443627] mt-4" />

          {/* Save btn */}
          <button className="bg-[#00FF40] text-[#443627] px-10 py-2 rounded-lg font-semibold shadow mt-6 w-full lg:w-auto hover:shadow-lg hover:bg-[#5CB338] hover:text-white transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
