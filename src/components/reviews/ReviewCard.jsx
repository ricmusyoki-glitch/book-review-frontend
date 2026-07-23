import { useAuth } from "../../context/AuthContext";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();

  const isOwner = user?.username === review.user;

  return (
    <div className="bg-white border rounded-lg shadow p-4">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="font-bold text-blue-600">
            {review.user}
          </h3>

          <p className="text-yellow-500 font-semibold">
            {"⭐".repeat(review.rating)}
          </p>
        </div>

        <small className="text-gray-500">
          {new Date(review.created_at).toLocaleDateString()}
        </small>

      </div>

      <p className="mt-4 text-gray-700">
        {review.comment}
      </p>

      {isOwner && (
        <div className="mt-4 flex gap-3">

          <button
            onClick={() => onEdit(review)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(review.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
};

export default ReviewCard;