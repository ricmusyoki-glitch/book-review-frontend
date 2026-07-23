import BookCard from "./BookCard";

const BookGrid = ({ books }) => {
  if (books.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No books found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
};

export default BookGrid;