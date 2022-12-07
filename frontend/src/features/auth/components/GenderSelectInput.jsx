import styles from "./AuthInput.module.css";
import { AuthErrorMessage } from "./AuthErrorMessage";

export function GenderSelectInput({ value, onChange, errorMessage }) {
  return (
    <div
      style={{
        paddingBottom: "12px",
      }}
    >
      <label htmlFor="gender" className={styles.inputLabel}>
        Enter your gender
      </label>
      <select
        name="gender"
        id="gender"
        className={`${styles.input} ${errorMessage && styles.invalid}`}
        value={value}
        onChange={onChange}
      >
        <option value=""></option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="custom">Custom</option>
        <option value="none">Prefer not to say</option>
      </select>
      <AuthErrorMessage errorMessage={errorMessage} />
    </div>
  );
}
