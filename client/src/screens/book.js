/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useParams } from 'react-router';

import { useBook } from '../utils/books';
import { useListItem } from '../utils/list';

import * as colors from '../styles/colors';
import * as mq from '../styles/media-queries';
import StatusButton from '../components/status-button';

export default function Book() {
  const { bookId: id } = useParams();
  const { data: book, isLoading, isError, isSuccess } = useBook(id);
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
      </div>
    </div>
  );
}
