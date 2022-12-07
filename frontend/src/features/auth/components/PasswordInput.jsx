import { useState } from "react";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { AuthInput } from "./AuthInput";
import styles from "./AuthInput.module.css";

export function PasswordInput({
  value,
  onChange,
  errorMessage,
  withLabel = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {withLabel ? (
        <label htmlFor="password" className={styles.inputLabel}>
          Choose a password
        </label>
      ) : null}
      <div className={styles.passwordInput}>
        <AuthInput
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Your Password"
          value={value}
          onChange={onChange}
          errorMessage={errorMessage}
          icon={
            showPassword ? (
              <AiTwotoneEyeInvisible
                className={styles.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiTwotoneEye
                className={styles.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )
          }
        />
      </div>
    </>
  );
}
