import { FiHome } from "react-icons/fi";

function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold flex items-center mb-4">
        <FiHome className="mr-1" />
        Dashboard
      </h1>
      <hr className="border-t-2"/>
    </div>
  );
}

export default Dashboard;