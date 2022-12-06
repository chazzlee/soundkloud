import { AuthErrorMessage } from "./AuthErrorMessage";
import styles from "./AuthInput.module.css";

export function AuthInput({
  onChange,
  value,
  classNames,
  errorMessage,
  children,
  ...rest
}) {
  return (
    <>
      <input
        className={`${styles.input} ${errorMessage && styles.invalid}`}
        type="text"
        value={value}
        onChange={onChange}
        {...rest}
      />
      {children}
      <AuthErrorMessage errorMessage={errorMessage} />
    </>
  );
}
