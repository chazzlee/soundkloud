import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../../api/csrfFetch";
import { Modal } from "../../../context/Modal";
import { loginUser, registerUser } from "../store";
import { IoMdClose } from "react-icons/io";
import { IoCaretBack } from "react-icons/io5";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

import styles from "./AuthModal.module.css";
import "./AuthModal.css";
import { AuthModalFooter } from "./AuthModalFooter";
import { AuthErrorMessage } from "./AuthErrorMessage";
import { AuthInput } from "./AuthInput";
import authInputStyles from "./AuthInput.module.css";

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
  const [errors, setErrors] = useState({ email: "", password: "", unique: "" });

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
    if (profileErrors.displayName) {
      setProfileErrors((prev) => ({ ...prev, displayName: "" }));
    }
    if (profileErrors.age) {
      setProfileErrors((prev) => ({ ...prev, age: "" }));
    }
    if (profileErrors.gender) {
      setProfileErrors((prev) => ({ ...prev, gender: "" }));
    }

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

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleRegister = (event) => {
    event.preventDefault();
    if (!profileValues.displayName) {
      setProfileErrors((prev) => ({
        ...prev,
        displayName: "Enter your display name",
      }));
    }
    if (!profileValues.age) {
      setProfileErrors((prev) => ({ ...prev, age: "Enter your age." }));
    }
    if (!profileValues.gender) {
      setProfileErrors((prev) => ({
        ...prev,
        gender: "Please indicate your gender.",
      }));
    }

    if (
      profileErrors.displayName ||
      profileErrors.age ||
      profileErrors.gender
    ) {
      //TODO: still submitting...
      return;
    } else {
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
          setErrors({
            password: "",
            email: "",
            unique: "Email has already been taken",
          });
        });
    }
  };

  let currentStep = null;
  if (isEmailStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <div className={styles.socialButtonGroup}>
          <button className="social-login-btn facebook">
            <img
              src="https://secure.sndcdn.com/assets/facebook-8d9809.png"
              alt=""
              height="15px"
              width="15px"
              style={{ marginRight: "0.5rem" }}
            />
            <div>Continue with Facebook</div>
          </button>
          <button className="social-login-btn google">
            <img
              src="https://secure.sndcdn.com/assets/google-a6c367.svg"
              alt=""
              height="15px"
              width="15px"
              style={{ marginRight: "0.5rem" }}
            />
            <div>Continue with Google</div>
          </button>
          <button className="social-login-btn apple">
            <img
              src="https://secure.sndcdn.com/assets/apple-0a88d2.svg"
              alt=""
              height="28px"
              width="28px"
              style={{ marginRight: "0.3rem", display: "block" }}
            />
            <div>Continue with Apple</div>
          </button>
          <button
            className="social-login-btn demo"
            onClick={(e) => {
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
                .catch((err) =>
                  console.error("Demo User: Somethign went wrong", err)
                );
            }}
          >
            Continue with Demo
          </button>
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
            <label htmlFor="password">Choose a password</label>
            <div className={styles.passwordInput}>
              <input
                className={`${authInputStyles.input} ${
                  errors.password && styles.invalid
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
          <div>
            <label htmlFor="displayName">Choose your display name</label>
            <AuthInput
              id="displayName"
              name="displayName"
              errorMessage={profileErrors.displayName}
              value={profileValues.displayName}
              onChange={handleProfileChange}
            />
          </div>

          <div>
            <label htmlFor="age">Enter your age</label>
            <AuthInput
              type="number"
              id="age"
              name="age"
              errorMessage={profileErrors.age}
              value={profileValues.age}
              onChange={handleProfileChange}
            />
          </div>

          <div>
            <label htmlFor="gender">Enter your gender</label>
            <select
              name="gender"
              id="gender"
              className={`${authInputStyles.input} ${
                profileErrors.gender && styles.invalid
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
            <AuthErrorMessage errorMessage={errors.unique} />
          </div>

          {/* FIXME: why is this here? */}
          {/* {errors.password ? (
            <p className={styles.invalidMessage}>{errors.password}</p>
          ) : null} */}
          <button type="submit" className={styles.continueBtn}>
            Continue
          </button>
        </form>
        <AuthModalFooter showTerms={true} />
      </div>
    );
  }

  return <Modal onClose={onClose}>{currentStep}</Modal>;
}
