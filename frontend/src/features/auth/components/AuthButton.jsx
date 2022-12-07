import styles from "./AuthButton.module.css";

export function AuthButton({ label, ...rest }) {
  return (
    <button type="submit" className={styles.authButton} {...rest}>
      {label}
    </button>
  );
}
