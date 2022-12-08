import { AuthButton } from "../AuthButton";
import { AuthErrorMessage } from "../AuthErrorMessage";
import { AuthInput } from "../AuthInput";
import styles from "../AuthModal.module.css";
import inputStyles from "../AuthInput.module.css";
import { AuthModalFooter } from "../AuthModalFooter";
import { GenderSelectInput } from "../GenderSelectInput";
import { CloseButton } from "./CloseButton";

export function CreateProfileStep({
  values,
  errorMessages,
  submitted,
  serverError,
  onClose,
  onSubmit,
  onChange,
}) {
  return (
    <div className={styles.modalForm}>
      <CloseButton onClose={onClose} />
      <h3 className={styles.modalTitle}>Create your SoundCloud account</h3>
      <form onSubmit={onSubmit} noValidate>
        <div
          style={{
            paddingBottom: "12px",
          }}
        >
          <label htmlFor="displayName" className={inputStyles.inputLabel}>
            Choose your display name
          </label>
          <AuthInput
            id="displayName"
            name="displayName"
            errorMessage={errorMessages.displayName}
            value={values.displayName}
            onChange={onChange}
            autoFocus={true}
          />
        </div>

        <div
          style={{
            paddingBottom: "12px",
          }}
        >
          <label htmlFor="age" className={inputStyles.inputLabel}>
            Enter your age
          </label>
          <AuthInput
            type="number"
            id="age"
            name="age"
            errorMessage={errorMessages.age}
            value={values.age}
            onChange={onChange}
          />
        </div>

        <GenderSelectInput
          value={values.gender}
          errorMessage={errorMessages.gender}
          onChange={onChange}
        />
        <AuthButton label={"Continue"} disabled={submitted} />
      </form>
      <div style={{ padding: "0 20px", textAlign: "center" }}>
        <AuthErrorMessage errorMessage={serverError} />
      </div>
      <AuthModalFooter showTerms={true} />
    </div>
  );
}
