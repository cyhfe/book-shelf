/** @jsxImportSource @emotion/react */

import * as mq from '../styles/media-queries';
import * as colors from '../styles/colors';
import { Link } from 'react-router-dom';
import StatusButton from './status-button';
import { css } from '@emotion/react';

function BookRow({ book, isLoading }) {
  const { title, author, coverImageUrl } = book;
  const id = book._id;
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {isLoading ? null : (
        <div
          css={css`
            position: absolute;
            right: -20px;
            height: 100%;
          `}
        >
          <StatusButton book={book} />
        </div>
      )}
      <Link
        to={`book/${id}`}
        css={{
          minHeight: 270,
          display: 'flex',
          gap: '20px',
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          textDecoration: 'none',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{ maxHeight: '100%', width: '100%' }}
          />
        </div>
        <div css={{ flex: 1 }}>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
            }}
          >
            <div css={{ flex: 1 }}>
              <h2
                id={id}
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
            </div>
            <div css={{ marginLeft: 10 }}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '0.85em',
                }}
              >
                {author}
              </div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small css={{ whiteSpace: 'break-spaces', display: 'block' }}>
            {book.synopsis.substring(0, 500)}...
          </small>
        </div>
      </Link>
    </div>
  );
}

export { BookRow };
