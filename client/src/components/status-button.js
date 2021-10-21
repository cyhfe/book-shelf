/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  useListItem,
  useCreateListItem,
  useUpdateListItem,
  useRemoveFromList,
} from '../utils/list';

import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import { CircleButton, Spinner } from './lib';
import * as colors from '../styles/colors';

export function TooltipButton({
  label,
  highlight,
  icon,
  isLoading,
  isError,
  error,
  ...rest
}) {
  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
}

export default function StatusButton({ book }) {
  const id = book._id;
  const listItem = useListItem(id);
  const { mutate: addToList, isLoading: addToListLoading } =
    useCreateListItem();
  const { mutate: removeFromList, isLoading: removeFromListLoading } =
    useRemoveFromList();
  const { mutate: updateItem, isLoading: updateItemLoading } =
    useUpdateListItem();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      `}
    >
      {listItem ? (
        listItem.status === 'READING' ? (
          <TooltipButton
            label="mark as finished"
            onClick={() => updateItem({ id, status: 'FINISHED' })}
            highlight={colors.yellow}
            icon={updateItemLoading ? <Spinner /> : <FaBook />}
          />
        ) : (
          <TooltipButton
            label="mark as reading"
            onClick={() => updateItem({ id, status: 'READING' })}
            icon={updateItemLoading ? <Spinner /> : <FaCheckCircle />}
            highlight={colors.green}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="remove from list"
          highlight={colors.danger}
          onClick={() => removeFromList(id)}
          icon={removeFromListLoading ? <Spinner /> : <FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => addToList(id)}
          icon={addToListLoading ? <Spinner /> : <FaPlusCircle />}
        />
      )}
    </div>
  );
}
