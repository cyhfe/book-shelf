import { Dialog } from "@reach/dialog";
import Logo from "./components/logo";

import "@reach/dialog/styles.css";
import { useState } from "react";

function LoginForm({ onSubmit, buttonText }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements?.username?.value;
    const password = e.target.elements?.password?.value;
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="text" id="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
}

export default function App() {
  const [openModal, setOpenModal] = useState("none");

  const login = (formData) => {
    console.log("login", formData);
  };

  const register = (formData) => {
    console.log("register", formData);
  };

  return (
    <div>
      <Logo />
      <h1>bookshelf</h1>
      <button onClick={() => setOpenModal("login")}>Login</button>
      <button onClick={() => setOpenModal("register")}>register</button>
      <Dialog
        aria-label="login"
        isOpen={openModal === "login"}
        onDismiss={() => setOpenModal("none")}>
        <button onClick={() => setOpenModal("none")}>Close</button>
        <LoginForm buttonText="login" onSubmit={login} />
      </Dialog>
      <Dialog
        isOpen={openModal === "register"}
        aria-label="register"
        onDismiss={() => setOpenModal("none")}>
        <button onClick={() => setOpenModal("none")}>Close</button>
        <LoginForm buttonText="register" onSubmit={register} />
      </Dialog>
    </div>
  );
}
