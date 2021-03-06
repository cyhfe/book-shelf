/** @jsxImportSource @emotion/react */

import { Input, Spinner, BookListUL } from '../components/lib';
import { BookRow } from '../components/book-row';
import { FaSearch, FaTimes } from 'react-icons/fa';
import * as colors from '../styles/colors';

import { css } from '@emotion/react';

import ToolTip from '@reach/tooltip';
import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useBooksSearch } from '../utils/books';

export default function DiscoverBooksScreen() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const {
    data: books,
    error,
    isLoading,
    isError,
  } = useBooksSearch(query, user.token);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const search = e.target.elements?.search?.value;
    setQuery(search);
  }

  return (
    <div
      css={css`
        /* max-width: 800px; */
        margin: auto;
      `}
    >
      <form
        onSubmit={handleSearchSubmit}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <Input
          placeholder="search books..."
          id="search"
          css={css`
            width: 100%;
          `}
        />
        <ToolTip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={css`
                border: 0;
                position: relative;
                margin-left: -35px;
                background: transparent;
              `}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes css={{ color: colors.danger }} />
              ) : (
                <FaSearch />
              )}
            </button>
          </label>
        </ToolTip>
      </form>
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      {books.length ? (
        <BookListUL css={{ marginTop: 20 }}>
          {books.map((book) => (
            <li key={book._id}>
              <BookRow key={book._id} book={book} isLoading={isLoading} />
            </li>
          ))}
        </BookListUL>
      ) : (
        <p>No books found. Try another search.</p>
      )}
    </div>
  );
}
