import { IoMdClose } from "react-icons/io";
import styles from "./CloseButton.module.css";

export function CloseButton({ onClose }) {
  return (
    <button onClick={onClose} className={styles.closeBtn} title="Close">
      <IoMdClose />
    </button>
  );
}
