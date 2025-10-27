import BookCard from "./BookCard";

const BookList = ({ books }) => {
  if (!books.length) return null;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;
