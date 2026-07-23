import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome, {user?.first_name || user?.username}!
          </h1>

          <p className="mt-2 text-gray-600">
            Discover books, write reviews, and share your thoughts with the
            community.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Browse Books
              </h2>

              <p className="mt-3 text-gray-600">
                Explore the collection of books, read reviews, and discover new
                favorites.
              </p>

              <Link
                to="/books"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Browse Books
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Share Reviews
              </h2>

              <p className="mt-3 text-gray-600">
                Help other readers by rating books and writing thoughtful
                reviews based on your reading experience.
              </p>

              <Link
                to="/books"
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Start Reviewing
              </Link>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              About This Application
            </h2>

            <p className="text-gray-700 leading-7">
              This Book Review App allows authenticated users to browse books,
              add new books, write reviews, edit their own reviews, delete their
              own books and reviews, and discover what other readers think about
              different books.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;