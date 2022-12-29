import styles from "./SocialButton.module.css";
import "./SocialButton.css";
import { ButtonSpinner } from "../../../components/ButtonSpinner";

export function SocialButton({
  label,
  iconUrl,
  className,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <button
      className={`${styles.socialLoginBtn} ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {className !== "demo" ? (
        <img
          src={iconUrl}
          alt={className}
          height="15px"
          width="15px"
          style={{ marginRight: "0.5rem" }}
          {...rest}
        />
      ) : null}
      {disabled ? <ButtonSpinner /> : <div>{label}</div>}
    </button>
  );
}
