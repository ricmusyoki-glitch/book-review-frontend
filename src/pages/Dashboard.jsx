import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              Book Review App
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome, {user?.first_name || user?.username}!
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        <div className="mt-12">

          <Link
            to="/books"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Browse Books
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;