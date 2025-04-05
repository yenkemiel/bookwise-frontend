// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../api';

const BookForm = ({ selectedBook, onSuccess }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    description: ''
  });

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setBook({
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        description: ''
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookToSubmit = {
        ...book,
        publicationYear: parseInt(book.publicationYear, 10),
      };
      if (book.id) {
        await updateBook(book.id, bookToSubmit);
      } else {
        await createBook(bookToSubmit);
      }
      setBook({
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        description: '',
      });
      onSuccess();
    } catch (error) {
      console.error('❌ 發送 API 時出錯了:', error);
      alert('新增書籍失敗：' + (error.message || '未知錯誤'));
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3">{book.id ? '編輯書籍' : '新增書籍'}</h2>

      <div className="mb-3">
        <label className="form-label">書名</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={book.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">作者</label>
        <input
          type="text"
          name="author"
          className="form-control"
          value={book.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ISBN</label>
        <input
          type="text"
          name="isbn"
          className="form-control"
          value={book.isbn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">出版年份</label>
        <input
          type="number"
          name="publicationYear"
          className="form-control"
          value={book.publicationYear}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">簡介</label>
        <textarea
          name="description"
          className="form-control"
          value={book.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {book.id ? '更新' : '新增'}
      </button>
    </form>
  );
};

export default BookForm;
