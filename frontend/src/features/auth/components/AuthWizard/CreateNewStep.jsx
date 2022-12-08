import { AuthButton } from "../AuthButton";
import styles from "../AuthModal.module.css";
import { AuthModalFooter } from "../AuthModalFooter";
import { EmailDisplayWithBack } from "../EmailDisplayWithBack";
import { PasswordInput } from "../PasswordInput";
import { CloseButton } from "./CloseButton";

export function CreateNewStep({
  values,
  errorMessage,
  onClose,
  onSubmit,
  onChange,
  onClick,
}) {
  return (
    <div className={styles.modalForm}>
      <CloseButton onClose={onClose} />
      <h3 className={styles.modalTitle}>Create your SoundCloud account</h3>
      <form onSubmit={onSubmit} noValidate>
        <EmailDisplayWithBack displayValue={values.email} onClick={onClick} />
        <PasswordInput
          value={values.password}
          onChange={onChange}
          errorMessage={errorMessage}
          withLabel={true}
          autoFocus={true}
        />
        <AuthButton label={"Accept & continue"} />
      </form>
      <AuthModalFooter showSuggestions={true} showPrivacyPolicy={true} />
    </div>
  );
}
