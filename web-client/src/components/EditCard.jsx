import React from "react";
import { FiCreditCard } from "react-icons/fi";

const EditCard = ({ expense, onClose, onSave }) => {
  const [editedExpense, setEditedExpense] = React.useState(expense);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedExpense);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] md:w-[70%] lg:w-[60%] max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Left col for inputs */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={editedExpense.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                name="category"
                value={editedExpense.category}
                onChange={handleChange}
                className="w-full bg-[#F4F2F2] border border-gray-300 rounded px-3 py-2"
              >
                <option value="Bills">Bills</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={editedExpense.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Note</label>
              <textarea
                name="note"
                value={editedExpense.note}
                onChange={handleChange}
                className="w-full bg-[#F4F2F2] border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Right col, save btn and cancel */}
          <div className="flex flex-col items-center justify-between w-full lg:w-auto">
            <FiCreditCard className="text-[120px] sm:text-[180px] lg:text-[200px] text-[#443627] mt-4" />
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <button
                type="submit"
                className="bg-[#00FF40] text-[#443627] px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg hover:bg-[#5CB338] hover:text-white transition w-full sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-500 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
