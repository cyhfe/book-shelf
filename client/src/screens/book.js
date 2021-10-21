/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useParams } from 'react-router';

import { useBook } from '../utils/books';
import { useListItem, useUpdateListItem } from '../utils/list';

import * as mq from '../styles/media-queries';
import StatusButton from '../components/status-button';
import { Spinner } from '../components/lib';

export default function Book() {
  const { bookId: id } = useParams();
  const { data: book } = useBook(id);
  const listItem = useListItem(id);
  const { title, author, coverImageUrl, publisher, synopsis } = book;
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 20px;
            ${mq.small} {
              flex-direction: column;
              align-items: center;
            }
          `}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{ width: '100%', maxWidth: '14rem' }}
          />
          <div
            css={css`
              display: flex;
              gap: 20px;
            `}
          >
            <div>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={css`
                height: 120px;
              `}
            >
              {book.loadingBook ? null : <StatusButton book={book} />}
            </div>
          </div>
        </div>

        <div
          css={css`
            margin-top: 30px;
          `}
        >
          <p css={{ whiteSpace: 'break-spaces', display: 'block' }}>
            {synopsis}
          </p>
        </div>

        {listItem && listItem.status === 'FINISHED' ? (
          <NotesTextarea listItem={listItem} />
        ) : null}
      </div>
    </div>
  );
}

function NotesTextarea({ listItem }) {
  const { mutate: updateListItem, isLoading } = useUpdateListItem();
  const debounceMutate = debounce((id, notes) => updateListItem({ id, notes }));
  function handleNotesChange(e) {
    debounceMutate(listItem.book._id, e.target.value);
  }
  return (
    <div>
      <label
        htmlFor="notes"
        css={{
          display: 'inline-block',
          marginRight: 10,
          marginTop: '0',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        Notes
      </label>
      {isLoading ? <Spinner /> : null}
      <textarea
        id="notes"
        name="notes"
        onChange={handleNotesChange}
        defaultValue={listItem.notes}
        css={css`
          width: 100%;
          min-height: 120px;
          display: block;
          padding: 8px;
        `}
      />
    </div>
  );
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
