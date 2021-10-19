import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useAuth } from '../context/auth-context';
import client from '../utils/api-client';
import { BookRow } from '../components/book-row';
import { LoadingBook } from '../utils/books';
const fetchBook = (id, token) => () => {
  return client(`book/${id}`, { token });
};

export default function Book() {
  const { user } = useAuth();
  const { bookId: id } = useParams();
  const {
    data: book,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(['book', id], fetchBook(id, user.token));
  return <div>{isLoading ? <div>loading</div> : null}</div>;
}
