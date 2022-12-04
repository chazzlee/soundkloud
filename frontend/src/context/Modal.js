import { createContext, useContext, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={onClose} />
      <div className={styles.modalContent}>{children}</div>
    </div>,
    modalNode
  );
}
