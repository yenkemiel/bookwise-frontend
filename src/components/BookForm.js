// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../api';

const BookForm = ({ selectedBook, onSuccess }) => {
  const [book, setBook] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setBook({ title: '', author: '', description: '' });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book.id) {
      await updateBook(book.id, book);
    } else {
      await createBook(book);
    }
    setBook({ title: '', author: '', description: '' });
    onSuccess(); // 通知父層刷新列表、清空表單
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{book.id ? '編輯書籍' : '新增書籍'}</h2>
      <input
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="書名"
        required
      />
      <input
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="作者"
        required
      />
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
        placeholder="簡介"
      />
      <button type="submit">送出</button>
    </form>
  );
};

export default BookForm;
