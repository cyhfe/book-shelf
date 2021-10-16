/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { cloneElement, createContext, useContext, useState } from 'react';
import { Dialog, CircleButton } from './lib';

const callAll =
  (...fns) =>
  (...args) => {
    fns.forEach((fn) => fn && fn(...args));
  };

const ModalContext = createContext();
ModalContext.displayName = 'ModalContext';

function Modal({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]} {...props}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = useContext(ModalContext);
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
    ></Dialog>
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ModalDismissButton>
          <CircleButton>x</CircleButton>
        </ModalDismissButton>
      </div>
      <h3
        css={css`
          text-align: center;
          font-size: 2em;
        `}
      >
        {title}
      </h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalOpenButton, ModalDismissButton, ModalContents };
