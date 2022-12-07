import { AuthErrorMessage } from "./AuthErrorMessage";
import styles from "./AuthInput.module.css";

export function AuthInput({
  onChange,
  value,
  errorMessage,
  icon = null,
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
      {icon}
      <AuthErrorMessage errorMessage={errorMessage} />
    </>
  );
}
