import React from "react";
import { useNavigate } from "react-router-dom";

const StartupPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white/40 backdrop-blur-md border border-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Expense Tracker</h1>
        <p className="mb-6">Track and manage your expenses with ease.</p>
        <button
          onClick={handleStart}
          className="bg-[#443627] text-white px-6 py-2 rounded-2xl hover:bg-[#2f261b]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default StartupPage;
