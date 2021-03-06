/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Dialog as ReachDialog } from '@reach/dialog';
import * as mq from '../styles/media-queries';
import { FaSpinner } from 'react-icons/fa';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input({
  borderRadius: '3px',
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
});

const buttonColor = ({ variant }) => {
  switch (variant) {
    case 'primary':
      return css`
        background: #3f51b5;
        color: white;
      `;
    case 'secondary':
      return css`
        background: #f1f2f7;
        color: #434449;
      `;
    default:
      break;
  }
};

export const Button = styled.button`
  padding: 10px 15px;
  border: 0;
  line-height: 1;
  border-radius: 3px;
  ${buttonColor}
`;

export const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: '#434449',
  border: `1px solid #f1f1f4`,
  cursor: 'pointer',
});

export const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
});

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

export function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}

export const BookListUL = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
});
