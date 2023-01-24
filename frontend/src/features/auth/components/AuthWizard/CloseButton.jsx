import { IoMdClose } from "react-icons/io";
import styles from "./CloseButton.module.css";

// TODO: move to shared components
export function CloseButton({ onClose }) {
  return (
    <button onClick={onClose} className={styles.closeBtn} title="Close">
      <IoMdClose />
    </button>
  );
}
