import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Browse_Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3000/book/get-books')
      .then((res) => {
        setBooks(res.data.books);
        setLoading(false);
      })
      .catch((err) => {
        alert('Failed to load books. Try again later.');
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once after mounting

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Browse Books</h1>

      {loading ? (
        <p className="text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">{book.name}</h2>
              <p className="text-gray-600">Book ID: {book.book_id}</p>
              <p className="text-gray-600">In Shelf: {book.inshelf}</p>
              <p className="text-gray-600">Issued: {book.issued}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse_Books;
