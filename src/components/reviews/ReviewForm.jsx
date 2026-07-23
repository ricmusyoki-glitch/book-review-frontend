import { useState } from "react";

const ReviewForm = ({ bookId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        book: bookId,
        rating: Number(rating),
        comment,
      });

      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);

      const response = err.response?.data;

      if (typeof response === "string") {
        setError(response);
      } else if (response?.detail) {
        setError(response.detail);
      } else if (response?.non_field_errors) {
        setError(response.non_field_errors[0]);
      } else {
        setError("Failed to submit review.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 rounded-lg p-6 mt-8"
    >
      <h3 className="text-xl font-bold mb-4">
        Add Your Review
      </h3>

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      <div className="mb-4">

        <label className="block font-semibold mb-2">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border rounded p-2"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>

      </div>

      <div className="mb-4">

        <label className="block font-semibold mb-2">
          Comment
        </label>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Write your review..."
          required
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </form>
  );
};

export default ReviewForm;