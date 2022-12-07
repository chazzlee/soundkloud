import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../../api/csrfFetch";
import { Modal } from "../../../context/Modal";
import { loginUser, registerUser } from "../store";
import { IoMdClose } from "react-icons/io";
import { IoCaretBack } from "react-icons/io5";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

import styles from "./AuthModal.module.css";
import { AuthModalFooter } from "./AuthModalFooter";
import { AuthErrorMessage } from "./AuthErrorMessage";
import { AuthInput } from "./AuthInput";
import authInputStyles from "./AuthInput.module.css";
import { SocialButton } from "./SocialButton";

export function AuthModal({ onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("email");

  const isEmailStep = step === "email";
  const isPasswordStep = step === "password";
  const isCreateNewStep = step === "create";
  const isCreateProfileStep = step === "profile";

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const [profileValues, setProfileValues] = useState({
    displayName: "",
    age: "",
    gender: "",
  });

  const [profileErrors, setProfileErrors] = useState({
    displayName: "",
    age: "",
    gender: "",
  });

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleInputChange = (event) => {
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleProfileChange = (event) => {
    setProfileValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleNextStep = async (event) => {
    event.preventDefault();

    if (!formValues.email) {
      setErrors({
        email: "Enter a valid email address or profile url.",
        password: "",
      });
      return;
    }

    //-============
    const response = await csrfFetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email: formValues.email }),
    });
    const data = await response.json();

    if (data.success) {
      setStep("password");
    } else {
      setStep("create");
    }
  };

  const handlePrevStep = () => {
    setErrors({
      email: "",
      password: "",
    });
    setFormValues((prev) => ({ ...prev, password: "" }));
    setStep("email");
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleLogin = (event) => {
    event.preventDefault();

    if (isPasswordStep && !formValues.password) {
      setErrors({ email: "", password: "Enter a valid password." });
      return;
    } else if (isCreateNewStep && !formValues.password) {
      setErrors({
        email: "",
        password: "Password must be at least 6 characters.",
      });
      return;
    }

    dispatch(
      loginUser({
        email: formValues.email,
        password: formValues.password,
      })
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        }
      })
      .catch((_err) => setErrors({ password: "This password is incorrect." }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleAcceptAndContinue = (event) => {
    event.preventDefault();

    if (!formValues.password || formValues.password.length < 6) {
      setErrors({
        email: "",
        password: "Password must be at least 6 characters.",
      });
      return;
    }

    if (!errors.password) {
      setStep("profile");
    }
  };

  const isEmpty = (value) => value === "" || !value || value.length === 0;

  const profileErrorMessages = {
    displayName: "Enter your display name.",
    age: "Enter your age.",
    gender: "Please indicate your gender.",
  };

  const validateProfile = (profileValues) => {
    setProfileErrors({
      displayName: "",
      age: "",
      gender: "",
    });

    let profileKeys = Object.keys(profileValues);
    let isValid = true;
    for (let key of profileKeys) {
      if (isEmpty(profileValues[key])) {
        isValid = false;
        setProfileErrors((prev) => ({
          ...prev,
          [key]: profileErrorMessages[key],
        }));
      }
    }

    return isValid;
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleRegister = (event) => {
    event.preventDefault();

    const isValid = validateProfile(profileValues);

    if (!isValid) {
      return;
    }

    const newUser = {
      ...formValues,
      ...profileValues,
    };
    dispatch(registerUser(newUser))
      .then((response) => {
        if (response.ok) {
          onSuccess();
        }
      })
      .catch((_err) => {
        setServerError(
          "This email address can’t be used. Please enter another email address to continue."
        );
      });
  };

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

  let currentStep = null;
  if (isEmailStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
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
        <div className={styles.or}>or</div>
        <form onSubmit={handleNextStep} noValidate>
          <AuthInput
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Your email address or profile URL"
            errorMessage={errors.email}
          />
          <button type="submit" className={styles.continueBtn}>
            Continue
          </button>
        </form>
        <AuthModalFooter showPrivacyPolicy={true} />
      </div>
    );
  } else if (isPasswordStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <h3 className={styles.modalTitle}>Welcome back!</h3>
        <form onSubmit={handleLogin} noValidate>
          <div
            onClick={handlePrevStep}
            className={authInputStyles.input}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            <IoCaretBack style={{ marginRight: "9px" }} />
            <span>{formValues.email}</span>
          </div>
          <div className={styles.passwordInput}>
            <input
              className={`${authInputStyles.input} ${
                errors.password && styles.invalid
              }`}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {showPassword ? (
              <AiTwotoneEyeInvisible
                className={styles.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiTwotoneEye
                className={styles.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <AuthErrorMessage errorMessage={errors.password} />
          <button type="submit" className={styles.continueBtn}>
            Sign in
          </button>
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
  } else if (isCreateNewStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <h3 className={styles.modalTitle}>Create your SoundCloud account</h3>
        <form onSubmit={handleAcceptAndContinue} noValidate>
          <div
            className={authInputStyles.input}
            onClick={handlePrevStep}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            <IoCaretBack style={{ marginRight: "9px" }} />
            <span>{formValues.email}</span>
          </div>
          <div>
            <label htmlFor="password" className={styles.inputLabel}>
              Choose a password
            </label>
            <div className={styles.passwordInput}>
              <input
                className={`${authInputStyles.input} ${
                  errors.password && authInputStyles.invalid
                }`}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
              {showPassword ? (
                <AiTwotoneEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiTwotoneEye
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <AuthErrorMessage errorMessage={errors.password} />
          <button type="submit" className={styles.continueBtn}>
            Accept & continue
          </button>
        </form>
        <AuthModalFooter showSuggestions={true} showPrivacyPolicy={true} />
      </div>
    );
  } else if (isCreateProfileStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <h3 className={styles.modalTitle}>Create your SoundCloud account</h3>
        <form onSubmit={handleRegister} noValidate>
          <div
            style={{
              paddingBottom: "12px",
            }}
          >
            <label htmlFor="displayName" className={styles.inputLabel}>
              Choose your display name
            </label>
            <AuthInput
              id="displayName"
              name="displayName"
              errorMessage={profileErrors.displayName}
              value={profileValues.displayName}
              onChange={handleProfileChange}
            />
          </div>

          <div
            style={{
              paddingBottom: "12px",
            }}
          >
            <label htmlFor="age" className={styles.inputLabel}>
              Enter your age
            </label>
            <AuthInput
              type="number"
              id="age"
              name="age"
              errorMessage={profileErrors.age}
              value={profileValues.age}
              onChange={handleProfileChange}
            />
          </div>

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
              className={`${authInputStyles.input} ${
                profileErrors.gender && authInputStyles.invalid
              }`}
              value={profileValues.gender}
              onChange={handleProfileChange}
            >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="custom">Custom</option>
              <option value="none">Prefer not to say</option>
            </select>
            <AuthErrorMessage errorMessage={profileErrors.gender} />
          </div>

          <button type="submit" className={styles.continueBtn}>
            Continue
          </button>
        </form>
        <div style={{ padding: "0 20px", textAlign: "center" }}>
          <AuthErrorMessage errorMessage={serverError} />
        </div>
        <AuthModalFooter showTerms={true} />
      </div>
    );
  }

  return <Modal onClose={onClose}>{currentStep}</Modal>;
}
