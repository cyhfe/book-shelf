/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Logo from './components/logo';
import { FormGroup, Input, Button, Spinner } from './components/lib';
import { Modal, ModalOpenButton, ModalContents } from './components/modal';
import { cloneElement } from 'react';

function LoginForm({ onSubmit, submitButton }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements?.username?.value;
    const password = e.target.elements?.password?.value;
    onSubmit({ username, password });
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
        <Input type="text" id="password" />
      </FormGroup>
      <div>
        {cloneElement(submitButton, {
          type: 'primary',
        })}
        <Spinner
          css={css`
            margin-left: 5px;
          `}
        />
      </div>
    </form>
  );
}

export default function App() {
  const login = (formData) => {
    console.log('login', formData);
  };

  const register = (formData) => {
    console.log('register', formData);
  };

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
