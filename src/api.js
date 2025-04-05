// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/books';

export const getBooks = () => axios.get(API_BASE_URL);
export const createBook = (book) => axios.post(API_BASE_URL, book);
export const updateBook = (id, book) => axios.put(`${API_BASE_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const searchBooksByAuthor = (author) =>
    axios.get(`${API_BASE_URL}/search/author`, {
      params: { author },
    });
export const searchBooksByTitle = (title) =>
  axios.get(`${API_BASE_URL}/search/title`, {
    params: { title },
  });
export const searchBooksByYear = (year) =>
  axios.get(`${API_BASE_URL}/search/year`, {
    params: { year },
  });
