import { useState } from "react";
import { Modal } from "../context/Modal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthModal({ onClose, onSuccess }) {
  const [modal, setModal] = useState("login");

  return (
    <Modal onClose={onClose}>
      <button onClick={onClose}>X</button>
      {modal === "login" && (
        <button onClick={() => setModal("register")}>Register</button>
      )}
      {modal === "login" ? (
        <div className="session-modal">
          <LoginForm onSuccess={onSuccess} />
        </div>
      ) : (
        <div className="register-modal">
          <RegisterForm onSuccess={onSuccess} />
        </div>
      )}
    </Modal>
  );
}
