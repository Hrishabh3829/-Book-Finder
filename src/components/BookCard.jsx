const BookCard = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/200x250?text=No+Cover";

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} className="book-cover" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <a
        href={`https://openlibrary.org${book.key}`}
        target="_blank"
        rel="noreferrer"
        className="book-link"
      >
        View on Open Library →
      </a>
    </div>
  );
};

export default BookCard;
