import { useEffect, useState } from "react";

import BookGrid from "../components/books/BookGrid";
import BookForm from "../components/books/BookForm";
import bookService from "../services/bookService";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await bookService.getBooks();

      console.log("Books API Response:", data);

      setBooks(data.results);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = async (bookData) => {
    try {
      await bookService.createBook(bookData);

      await fetchBooks();

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create book.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading books...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Books
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {showForm ? "Close Form" : "+ Add Book"}
          </button>
        </div>

        {showForm && <BookForm onSubmit={handleCreateBook} />}

        <BookGrid books={books} />
      </div>
    </div>
  );
};

export default Books;