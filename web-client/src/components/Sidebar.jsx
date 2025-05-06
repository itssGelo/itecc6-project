import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCreditCard, FiPlusCircle, FiClipboard, FiList, FiBarChart, FiBarChart2 } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="w-64 h-screen p-5 bg-[#F2E2B1] text-[#443627]">
      <div className="flex flex-col items-center justify-center mb-20">
        <FiCreditCard className="text-5xl" />
        <h2 className="text-2xl font-bold">Expense Tracker</h2>
      </div>

      <nav className="flex items-center justify-center">
        <ul className="space-y-6">
          <li>
            <Link to="/" className="text-xl font-bold flex items-center space-x-2 relative text-[#443627] hover:text-[#443627] transition duration-300 
            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-black before:transition-all before:duration-300 
            hover:before:w-33"><FiHome className="mb-1"/>
              <span className="mb-1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/add-expense" className="text-xl font-bold flex items-center space-x-2 relative text-[#443627] hover:text-[#443627] transition duration-300 
            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-black before:transition-all before:duration-300 
            hover:before:w-37"><FiPlusCircle className="mb-1"/>
              <span className="mb-1">Add Expense</span>
            </Link>
          </li>
          <li>
            <Link to="/expense-manager" className="text-xl font-bold flex items-center space-x-2 relative text-[#443627] hover:text-[#443627] transition duration-300 
            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-black before:transition-all before:duration-300 
            hover:before:w-48"><FiList className="mb-1"/>
              <span className="mb-1">Expense Manager</span>
            </Link>
          </li>
          <li>
            <Link to="/monthly-summary" className="text-xl font-bold flex items-center space-x-2 relative text-[#443627] hover:text-[#443627] transition duration-300 
            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-black before:transition-all before:duration-300 
            hover:before:w-50"><FiBarChart2 className="mb-1"/>
              <span className="mb-1">Monthly Summary</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
