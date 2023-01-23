import { createContext, useContext, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useEscape } from "../hooks/useEsacpe";
import styles from "./Modal.module.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children, className = "" }) {
  useEscape(() => {
    onClose();
  });

  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={onClose} />
      <div className={`${styles.modalContent} ${className}`}>{children}</div>
    </div>,
    modalNode
  );
}
