import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';

interface Book {
 title: string;
 author: string;
 publication: string;
 gender: string;
 pages: number;
}
function BookForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Book, setBook] = useState<Book>({
        title: '',
        author: '',
        publication: '',
        gender: '',
        pages: 0,
    });
    useEffect(() => {
        if (id) {
            loadBook();
        }
    }, [id]);
    const loadBook = async () => {
        try {
            const response = await getBookById(id as string);
            setBook(response.data);
        } catch (error) {
            console.error("Error loading product data", error);
        }
     };
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({
                ...Book,
                [e.target.name]: e.target.value,
            });
     };
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        if (id) {
        await updateBook(id, Book);
        } else {
        await createBook(Book);
        }
        navigate('/');
        } catch (error) {
        console.error("Error saving product", error);
        }
        };
        return (
            <form onSubmit={handleSubmit}>
 <div>
 <label>title</label>
 <input
 type="text"
 name="title"
 value={Book.title}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>author</label>
 <input
 type="text"
 name="author"
 value={Book.author}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>publication</label>
 <input
 type="text"
 name="publication"
 value={Book.publication}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>gender</label>
 <input
 type="text"
 name="gender"
 value={Book.gender}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>pages</label>
 <input
 type="number"
 name="pages"
 value={Book.pages}
 onChange={handleChange}
 />
 </div>
 <button type="submit">Save</button>
 </form>
 );
}
export default BookForm;

           