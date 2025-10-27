import BookCard from "./BookCard";

const BookList = ({ books, onSelect }) => {
  if (!books.length) return null;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BookList;
