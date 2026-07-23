import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-blue-100";

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
           Book Review App
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg transition ${activeClass(
              "/dashboard"
            )}`}
          >
            Dashboard
          </Link>

          <Link
            to="/books"
            className={`px-4 py-2 rounded-lg transition ${activeClass(
              "/books"
            )}`}
          >
            Books
          </Link>

          <span className="text-gray-600 font-medium">
            {user?.first_name || user?.username}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;