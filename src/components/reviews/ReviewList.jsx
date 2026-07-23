import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;