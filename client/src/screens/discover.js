/** @jsxImportSource @emotion/react */

import { Input, Spinner, BookListUL } from '../components/lib';
import { BookRow } from '../components/book-row';
import { FaSearch, FaTimes } from 'react-icons/fa';
import * as colors from '../styles/colors';
import client from '../utils/api-client';

import { css } from '@emotion/react';

import ToolTip from '@reach/tooltip';
import { useEffect, useState } from 'react';
import { useAsync } from '../utils/hooks';
import { useAuth } from '../context/auth-context';

export default function DiscoverBooksScreen() {
  const { user } = useAuth();
  const { data: books, run, error, isLoading, isError, isSuccess } = useAsync();
  const [query, setQuery] = useState('');
  const [queried, setQueried] = useState(false);
  function handleSearchSubmit(e) {
    e.preventDefault();
    const search = e.target.elements?.search?.value;
    setQueried(true);
    setQuery(search);
  }

  useEffect(() => {
    if (!queried) return;
    run(
      client(`books?query=${encodeURIComponent(query)}`, { token: user.token })
    );
  }, [queried, query, run, user.token]);

  return (
    <div
      css={css`
        width: 90vw;
        max-width: 800px;
        padding: 40px 0;
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
      {isSuccess ? (
        books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {books.map((book) => (
              <li key={book._id}>
                <BookRow key={book._id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}
