import { useEffect, useState } from 'react';
import { getBook, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';
interface Book {
 id: string;
 title: string;
 author: string;
 publication: string;
 gender: string;
 pages: number;
}
function BookList() {
    const [Book , setBook] = useState<Book[]>([]);
    useEffect(() => {
        loadBook();
    }, []);
    const loadBook = async () => {
        const response = await getBook();
        setBook(response.data);
    };

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBook();
    };
        return (
            <div>
                <h1>Product List</h1>
                <Link to="/add">Add Book</Link>
                <ul>
                    {Book.map((Book) => (
                        <li key={Book.id}>
                            {Book.title} - {Book.author} - {Book.publication} - {Book.gender} - {Book.pages} units
                            <Link to={`/edit/${Book.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(Book.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
         );
    }
export default BookList;