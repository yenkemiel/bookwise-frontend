// src/App.js
import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // 用來強制刷新列表

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleSuccess = () => {
    setReloadKey(prev => prev + 1); // 讓 BookList 重新載入資料
    setSelectedBook(null); // 清空表單
  };

  return (
    <div className="App">
      <h1>📚 BookWise 書籍管理系統</h1>
      <BookForm selectedBook={selectedBook} onSuccess={handleSuccess} />
      <BookList key={reloadKey} onEdit={handleEdit} />
    </div>
  );
}

export default App;
