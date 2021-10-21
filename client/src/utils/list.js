import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useClient } from './api-client';

export function useList() {
  const client = useClient();
  return useQuery('list', () => {
    return client('list').then((res) => res.books);
  });
}

export function useListItem(bookId) {
  const { data: books } = useList();
  const item = books?.find((item) => item.book._id === bookId) ?? null;
  return item;
}

export function useCreateListItem() {
  const queryClient = useQueryClient();
  const client = useClient();
  return useMutation((bookId) => client('list', { data: { bookId } }), {
    onSuccess: () => queryClient.invalidateQueries('list'),
  });
}

export function useUpdateListItem() {
  const queryClient = useQueryClient();
  const client = useClient();
  return useMutation(
    ({ id, status }) => {
      return client('list', {
        data: { bookId: id, status },
        method: 'PATCH',
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('list'),
    }
  );
}

export function useRemoveFromList() {
  const queryClient = useQueryClient();
  const client = useClient();
  return useMutation(
    (id) => {
      return client('list', {
        data: { bookId: id },
        method: 'DELETE',
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('list'),
    }
  );
}
