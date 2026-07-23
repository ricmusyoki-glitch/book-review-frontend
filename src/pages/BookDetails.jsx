import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import bookService from "../services/bookService";
import reviewService from "../services/reviewService";

import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState("");

  const fetchBook = async () => {
    try {
      const data = await bookService.getBook(id);
      setBook(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load book.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    await reviewService.createReview(reviewData);
    await fetchBook();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading book...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto p-8">

        <Link
          to="/books"
          className="text-blue-600 hover:underline"
        >
          ← Back to Books
        </Link>

        <div className="bg-white rounded-xl shadow p-8 mt-6">

          <h1 className="text-4xl font-bold text-blue-600">
            {book.title}
          </h1>

          <p className="mt-4">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="mt-4">
            <strong>Description:</strong>
          </p>

          <p className="text-gray-700">
            {book.description}
          </p>

          <p className="mt-4">
            <strong>Published:</strong> {book.published_date}
          </p>

          <p className="mt-4">
            <strong>Created By:</strong> {book.created_by}
          </p>

          <div className="mt-8 border-t pt-6">

            <h2 className="text-2xl font-bold mb-4">
              Reviews
            </h2>

            <div className="flex gap-8 mb-6">

              <p>
                <strong>Average Rating:</strong>{" "}
                {book.average_rating ?? "No ratings yet"}
              </p>

              <p>
                <strong>Review Count:</strong>{" "}
                {book.review_count}
              </p>

            </div>

            <ReviewList reviews={book.reviews} />

            <ReviewForm
              bookId={book.id}
              onSubmit={handleReviewSubmit}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookDetails;