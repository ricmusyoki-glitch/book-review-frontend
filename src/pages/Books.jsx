import { useEffect, useMemo, useState } from "react";

import BookGrid from "../components/books/BookGrid";
import BookForm from "../components/books/BookForm";
import bookService from "../services/bookService";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await bookService.getBooks();

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

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (err) {
      console.error(err);

      if (err.response?.status === 403) {
        alert("You can only delete books that you created.");
      } else {
        alert("Failed to delete book.");
      }
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const search = searchTerm.toLowerCase();

      return (
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
      );
    });
  }, [books, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading books...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

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

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {showForm && (
          <div className="mb-8">
            <BookForm onSubmit={handleCreateBook} />
          </div>
        )}

        {filteredBooks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">
              No books found.
            </p>
          </div>
        ) : (
          <BookGrid
            books={filteredBooks}
            onDelete={handleDeleteBook}
          />
        )}

      </div>

    </div>
  );
};

export default Books;