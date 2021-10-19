import bookPlaceholderSvg from '../assets/book-placeholder.svg';
import { BookListUL } from '../components/lib';
import { BookRow } from '../components/book-row';
const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

export function LoadingBooks() {
  return (
    <BookListUL css={{ marginTop: 20 }}>
      {loadingBooks.map((book) => (
        <li key={book.id}>
          <BookRow key={book.id} book={book} />
        </li>
      ))}
    </BookListUL>
  );
}

// export function LoadingBook() {
//   return (

//   );
// }
