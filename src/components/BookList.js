import React, { useEffect, useState } from 'react';
import {
  getBooks,
  deleteBook,
  searchBooksByAuthor,
  searchBooksByTitle,
  searchBooksByYear
} from '../api';

const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);
  const [authorQuery, setAuthorQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');
  const [yearQuery, setYearQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
      setIsSearchMode(false);
    } catch (error) {
      console.error('載入書籍失敗', error);
    }
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  const handleSearchByAuthor = async () => {
    if (authorQuery.trim() === '') return;
    try {
      const response = await searchBooksByAuthor(authorQuery);
      setBooks(response.data);
      setIsSearchMode(true);
    } catch (error) {
      alert('查詢失敗');
      console.error(error);
    }
  };

  const handleSearchByTitle = async () => {
    if (titleQuery.trim() === '') return;
    try {
      const response = await searchBooksByTitle(titleQuery);
      setBooks(response.data);
      setIsSearchMode(true);
    } catch (error) {
      alert('查詢失敗');
      console.error(error);
    }
  };

  const handleSearchByYear = async () => {
    if (yearQuery.trim() === '') return;
    try {
      const response = await searchBooksByYear(yearQuery);
      setBooks(response.data);
      setIsSearchMode(true);
    } catch (error) {
      alert('查詢失敗');
      console.error(error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h2 className="mb-3">書籍清單</h2>

      {/* 查詢功能 */}
      <div className="mb-3">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="輸入作者名稱查詢"
            value={authorQuery}
            onChange={(e) => setAuthorQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={handleSearchByAuthor}>
            查詢作者
          </button>
        </div>

        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="輸入書名查詢"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={handleSearchByTitle}>
            查詢書名
          </button>
        </div>

        <div className="input-group mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="輸入出版年份查詢"
            value={yearQuery}
            onChange={(e) => setYearQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={handleSearchByYear}>
            查詢年份
          </button>
        </div>

        {isSearchMode && (
          <button className="btn btn-outline-secondary mt-2" onClick={loadBooks}>
            取消查詢
          </button>
        )}
      </div>

      {books.length === 0 ? (
        <p className="text-muted">目前沒有書籍資料。</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {books.map((book) => (
            <div key={book.id} className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">作者：{book.author}</h6>
                <p className="mb-1"><strong>ISBN：</strong>{book.isbn}</p>
                <p className="mb-1"><strong>出版年份：</strong>{book.publicationYear}</p>
                <p className="card-text"><strong>簡介：</strong>{book.description || '無'}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEdit(book)}
                  >
                    編輯
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
