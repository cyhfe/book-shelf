/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useList } from '../utils/list';
import { BookListUL } from './lib';
import { BookRow } from './book-row';
import { Spinner } from './lib';

function ListItemList({ filterListItems, noListItems, noFilteredListItems }) {
  const { data, isLoading } = useList();
  const listItems = data ?? [];
  const filteredListItems = filterListItems(listItems);
  if (isLoading) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 30px;
        `}
      >
        <Spinner />
      </div>
    );
  }
  if (!listItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    );
  }
  if (!filteredListItems.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>
        {noFilteredListItems}
      </div>
    );
  }
  return (
    <BookListUL>
      {filteredListItems.length &&
        filteredListItems.map((listItem) => (
          <li key={listItem.book._id}>
            <BookRow book={listItem.book} />
          </li>
        ))}
    </BookListUL>
  );
}

export { ListItemList };
