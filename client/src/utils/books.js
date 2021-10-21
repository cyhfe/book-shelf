import bookPlaceholderSvg from '../assets/book-placeholder.svg';
import { useQuery } from 'react-query';
import { useClient } from './api-client';

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

export const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  _id: `loading-book-${index}`,
  ...loadingBook,
}));

export function useBooksSearch(query) {
  const client = useClient();
  const result = useQuery(['books', query], () =>
    client(`book?query=${encodeURIComponent(query)}`)
  );
  return { ...result, data: result.data ?? loadingBooks };
}

export function useBook(id) {
  const client = useClient();
  const result = useQuery(['book', id], () => client(`book/${id}`));
  return { ...result, data: result.data ?? loadingBook };
}
