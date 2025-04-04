// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api';

const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h2>書籍清單</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <br />
            <button onClick={() => onEdit(book)}>編輯</button>
            <button onClick={() => handleDelete(book.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
