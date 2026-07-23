import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>

      <p className="mt-4 text-xl text-gray-700">
        Page not found.
      </p>

      <Link
        to="/login"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;