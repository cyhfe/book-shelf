/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Logo from './components/logo';
import { FormGroup, Input, Button, Spinner } from './components/lib';
import { Modal, ModalOpenButton, ModalContents } from './components/modal';
import { cloneElement } from 'react';
import { useAuth } from './context/auth-context';
import { useAsync } from './utils/hooks';
import * as colors from './styles/colors';

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync();
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements?.username?.value;
    const password = e.target.elements?.password?.value;
    run(onSubmit({ username, password }));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: stretch;
        > div {
          margin: 10px auto;
          width: 100%;
          max-width: 300px;
        }
      `}
    >
      <FormGroup>
        <label htmlFor="username">username</label>
        <Input type="text" id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">password</label>
        <Input type="password" id="password" />
      </FormGroup>
      <div>
        {cloneElement(
          submitButton,
          {
            type: 'primary',
          },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <div css={{ color: colors.danger }}>{error}</div> : null}
    </form>
  );
}

export default function UnauthenticatedApp() {
  const { login, register } = useAuth();
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px 0;
      `}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={css`
          & > button {
            margin: 0 6px;
          }
        `}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents title="Login" aria-label="login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents title="Register" aria-label="register">
            <LoginForm
              submitButton={<Button variant="secondary">register</Button>}
              onSubmit={register}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}
