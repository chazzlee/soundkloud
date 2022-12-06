import styles from "./AuthErrorMessage.module.css";

export function AuthErrorMessage({ errorMessage }) {
  return errorMessage ? (
    <p className={styles.invalidMessage}>{errorMessage}</p>
  ) : null;
}
