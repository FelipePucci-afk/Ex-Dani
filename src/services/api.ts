import axios from 'axios';


const api = axios.create({
 baseURL: 'http://localhost:3001'
});


export const getBook = () => api.get('/Book');
export const getBookById = (id: string) => api.get(`/Book/${id}`);
export const createBook = (Book: any) => api.post('/Book', Book);
export const updateBook = (id: string, Book: any) => api.put(`/Book/${id}`, Book);
export const deleteBook = (id: string) => api.delete(`/Book/${id}`);