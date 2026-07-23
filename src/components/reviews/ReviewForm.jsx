import { useEffect, useState } from "react";

const ReviewForm = ({
  bookId,
  reviewToEdit,
  onSubmit,
  onCancel,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [reviewToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        book: bookId,
        rating,
        comment,
      });

      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      if (typeof data === "string") {
        setError(data);
      } else if (data?.detail) {
        setError(data.detail);
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else {
        setError("Unable to submit review.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow border p-6">

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        {reviewToEdit ? "Edit Review" : "Leave a Review"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <label className="block font-semibold mb-2">
          Rating
        </label>

        <div className="flex gap-2 text-3xl mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
            >
              {star <= rating ? "⭐" : "☆"}
            </button>
          ))}
        </div>

        <label className="block font-semibold mb-2">
          Comment
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review..."
          required
        />

        <div className="flex gap-3 mt-6">

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
          >
            {loading
              ? "Saving..."
              : reviewToEdit
              ? "Update Review"
              : "Submit Review"}
          </button>

          {reviewToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
};

export default ReviewForm;