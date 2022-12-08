import { CloseButton } from "./CloseButton";
import styles from "../AuthModal.module.css";
import { EmailDisplayWithBack } from "../EmailDisplayWithBack";
import { PasswordInput } from "../PasswordInput";
import { AuthErrorMessage } from "../AuthErrorMessage";
import { AuthButton } from "../AuthButton";

export function PasswordStep({
  values,
  errorMessage,
  serverError,
  submitted,
  onClose,
  onSubmit,
  onChange,
  onClick,
}) {
  return (
    <div className={styles.modalForm}>
      <CloseButton onClose={onClose} />
      <h3 className={styles.modalTitle}>Welcome back!</h3>
      <form onSubmit={onSubmit} noValidate>
        <EmailDisplayWithBack displayValue={values.email} onClick={onClick} />
        <PasswordInput
          value={values.password}
          onChange={onChange}
          errorMessage={errorMessage}
          autoFocus={true}
        />
        <div style={{ padding: "10px 20px 0", textAlign: "center" }}>
          <AuthErrorMessage errorMessage={serverError} />
        </div>
        <AuthButton label="Sign in" disabled={submitted} />
      </form>
      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#044dd2",
          margin: 0,
          paddingBottom: "80px",
        }}
      >
        Don't know your password?
      </p>
    </div>
  );
}
