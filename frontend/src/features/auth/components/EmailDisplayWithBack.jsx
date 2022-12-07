import { IoCaretBack } from "react-icons/io5";
import styles from "./AuthInput.module.css";

export function EmailDisplayWithBack({ displayValue, onClick }) {
  return (
    <div
      className={`${styles.input} ${styles.emailWithBack}`}
      onClick={onClick}
    >
      <IoCaretBack style={{ marginRight: "9px" }} />
      <span>{displayValue}</span>
    </div>
  );
}
