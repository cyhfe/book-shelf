/** @jsxImportSource @emotion/react */

import { Input } from './components/lib';
import { FaSearch } from 'react-icons/fa';

import { css } from '@emotion/react';

import ToolTip from '@reach/tooltip';
export default function DiscoverBooksScreen() {
  return (
    <div
      css={css`
        width: 90vw;
        max-width: 800px;
        padding: 40px 0;
        margin: auto;
      `}
    >
      <form>
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
              <FaSearch />
            </button>
          </label>
        </ToolTip>
      </form>
    </div>
  );
}
