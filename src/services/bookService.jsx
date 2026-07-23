import api from "../api/axios";

const getBooks = async () => {
  const response = await api.get("/books/");
  return response.data;
};

const getBook = async (id) => {
  const response = await api.get(`/books/${id}/`);
  return response.data;
};

const createBook = async (bookData) => {
  const response = await api.post("/books/", bookData);
  return response.data;
};

const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}/`, bookData);
  return response.data;
};

const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}/`);
  return response.data;
};

const bookService = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;