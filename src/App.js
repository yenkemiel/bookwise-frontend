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
    <div className="container py-4">
      <h1 className="text-primary text-center">📚 BookWise 書籍管理系統</h1>
      <div className="row">
        <div className="col-md-6">
          <BookForm selectedBook={selectedBook} onSuccess={handleSuccess} />
        </div>
        <div className="col-md-6">
          <BookList key={reloadKey} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
  
}

export default App;
