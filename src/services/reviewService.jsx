import api from "../api/axios";

const getReviews = async () => {
  const response = await api.get("/reviews/");
  return response.data;
};

const createReview = async (reviewData) => {
  const response = await api.post("/reviews/", reviewData);
  return response.data;
};

const updateReview = async (id, reviewData) => {
  const response = await api.put(`/reviews/${id}/`, reviewData);
  return response.data;
};

const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}/`);
  return response.data;
};

const reviewService = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewService;