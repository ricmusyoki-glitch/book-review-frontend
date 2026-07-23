import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews,
  onEdit,
  onDelete,
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border p-6 text-center">
        <p className="text-gray-500">
          No reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;