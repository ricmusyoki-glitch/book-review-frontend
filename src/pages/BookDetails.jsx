import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import bookService from "../services/bookService";
import reviewService from "../services/reviewService";

import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviewToEdit, setReviewToEdit] = useState(null);

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

  const handleSubmit = async (reviewData) => {
    try {
      if (reviewToEdit) {
        await reviewService.updateReview(reviewToEdit.id, reviewData);
      } else {
        await reviewService.createReview(reviewData);
      }

      setReviewToEdit(null);
      await fetchBook();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = (review) => {
    setReviewToEdit(review);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    setReviewToEdit(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await reviewService.deleteReview(id);

      if (reviewToEdit?.id === id) {
        setReviewToEdit(null);
      }

      await fetchBook();
    } catch (err) {
      console.error(err);
      alert("Unable to delete review.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
            <strong>Description</strong>
          </p>

          <p className="text-gray-700">
            {book.description}
          </p>

          <p className="mt-4">
            <strong>Published:</strong>{" "}
            {book.published_date}
          </p>

          <p className="mt-2">
            <strong>Created By:</strong>{" "}
            {book.created_by}
          </p>

          <div className="border-t mt-8 pt-6">

            <div className="flex gap-8 mb-6">

              <div>
                <p className="text-gray-500">
                  Average Rating
                </p>

                <h2 className="text-2xl font-bold text-yellow-500">
                  ⭐ {book.average_rating ?? "N/A"}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">
                  Reviews
                </p>

                <h2 className="text-2xl font-bold text-blue-600">
                  {book.review_count}
                </h2>
              </div>

            </div>

            <ReviewList
              reviews={book.reviews}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <ReviewForm
              bookId={book.id}
              reviewToEdit={reviewToEdit}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookDetails;