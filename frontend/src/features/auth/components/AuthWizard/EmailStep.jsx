import { SocialButtonGroup } from "../SocialButtonGroup";
import { CloseButton } from "./CloseButton";
import { AuthInput } from "../AuthInput";
import { AuthButton } from "../AuthButton";
import { AuthModalFooter } from "../AuthModalFooter";
import styles from "../AuthModal.module.css";

export function EmailStep({
  value,
  errorMessage,
  submitted,
  onSuccess,
  onClose,
  onSubmit,
  onChange,
}) {
  return (
    <div className={styles.modalForm}>
      <CloseButton onClose={onClose} />
      <SocialButtonGroup onSuccess={onSuccess} />
      <div className={styles.or}>or</div>
      <form onSubmit={onSubmit} noValidate>
        <AuthInput
          type="email"
          name="email"
          value={value}
          onChange={onChange}
          placeholder="Your email address or profile URL"
          errorMessage={errorMessage}
          autoFocus={true}
        />
        <AuthButton label={"Continue"} disabled={submitted} />
      </form>
      <AuthModalFooter showPrivacyPolicy={true} />
    </div>
  );
}
