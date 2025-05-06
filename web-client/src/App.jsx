import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-[#F2F6D0]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
