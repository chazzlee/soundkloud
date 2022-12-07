import styles from "./SocialButtonGroup.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../store";
import { SocialButton } from "./SocialButton";

export function SocialButtonGroup({ onSuccess }) {
  const dispatch = useDispatch();
  const handleDemoLogin = () => {
    dispatch(
      loginUser({
        email: "demo@demo.com",
        password: "password",
      })
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        }
      })
      .catch((err) => console.error("Demo User: Somethign went wrong", err));
  };

  return (
    <div className={styles.socialButtonGroup}>
      <SocialButton
        label="Continue with Facebook"
        className="facebook"
        iconUrl="https://secure.sndcdn.com/assets/facebook-8d9809.png"
      />
      <SocialButton
        label="Continue with Google"
        className="google"
        iconUrl="https://secure.sndcdn.com/assets/google-a6c367.svg"
      />
      <SocialButton
        label="Continue with Apple"
        className="apple"
        iconUrl="https://secure.sndcdn.com/assets/apple-0a88d2.svg"
        style={{
          marginRight: "0.3rem",
          display: "block",
          height: "28px",
          width: "28px",
        }}
      />
      <SocialButton
        label="Continue with Demo"
        className="demo"
        onClick={handleDemoLogin}
      />
    </div>
  );
}
