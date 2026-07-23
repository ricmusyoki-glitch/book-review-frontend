const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-blue-600">
          {review.user}
        </h3>

        <span className="font-semibold">
          ⭐ {review.rating}/5
        </span>
      </div>

      <p className="mt-3 text-gray-700">
        {review.comment}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;