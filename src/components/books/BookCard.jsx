import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold text-blue-600">
        {book.title}
      </h2>

      <p className="mt-2 text-gray-700">
        <span className="font-semibold">Author:</span> {book.author}
      </p>

      <p className="mt-3 text-gray-600">
        {book.description.length > 120
          ? `${book.description.substring(0, 120)}...`
          : book.description}
      </p>

      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>
          <strong>Published:</strong> {book.published_date}
        </p>

        <p>
          <strong>Added by:</strong> {book.created_by}
        </p>

        <p>
          <strong>Average Rating:</strong>{" "}
          {book.average_rating ?? "No ratings"}
        </p>

        <p>
          <strong>Reviews:</strong> {book.review_count}
        </p>
      </div>

      <Link
        to={`/books/${book.id}`}
        className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;