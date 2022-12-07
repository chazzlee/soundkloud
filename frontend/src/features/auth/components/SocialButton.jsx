import styles from "./SocialButton.module.css";
import "./SocialButton.css";

export function SocialButton({ label, iconUrl, className, onClick, ...rest }) {
  return (
    <button
      className={`${styles.socialLoginBtn} ${className}`}
      type="button"
      onClick={onClick}
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
      <div>{label}</div>
    </button>
  );
}
