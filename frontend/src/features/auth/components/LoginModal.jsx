import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../../api/csrfFetch";
import { Modal } from "../../../context/Modal";
import { loginUser } from "../store";
import { IoMdClose } from "react-icons/io";
import { IoCaretBack } from "react-icons/io5";

import styles from "./LoginModal.module.css";
import "./LoginModal.css";

//TODO: validations - form state errors etc...
export function LoginModal({ onClose, onSuccess }) {
  const [formValues, setFormValues] = useState({
    email: "test@test.com",
    password: "password",
  });

  const [formState, setFormState] = useState({
    submitted: false,
    touched: false,
  });
  const [error, setError] = useState(null);
  const [step, setStep] = useState("email");

  const isEmailStep = step === "email";
  const isPasswordStep = step === "password";
  const isCreateNewStep = step === "create";

  const dispatch = useDispatch();

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleInputChange = (event) => {
    //TODO:! show error message again after first empty submit and second empty touch

    // if (formState.submitted) {
    //   setError(null);
    // }
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleNextStep = async (event) => {
    event.preventDefault();
    //TODO:
    setFormState((prev) => ({ ...prev, submitted: true }));
    if (!formValues.email) {
      setError("Enter a valid email address or profile url.");
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
      setStep("create"); //TODO: set to register step instead
    }
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleLogin = (event) => {
    event.preventDefault();
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
      .catch((err) => console.error("my err", err));
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
        </div>
        <div className={styles.or}>or</div>
        <form onSubmit={handleNextStep} noValidate>
          <input
            className={`${styles.input} ${error && styles.invalid}`}
            type="email"
            name="email"
            placeholder="Your email address or profile URL"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {error ? <p className={styles.invalidMessage}>{error}</p> : null}
          <button type="submit" className={styles.continueBtn}>
            Continue
          </button>
        </form>
        <div className={styles.modalFooter}>
          <a href="#help" className={styles.needHelpLink}>
            Need help?
          </a>
          <p className={styles.privacyPolicy}>
            When registering, you agree that we may use your provided data for
            the registration and to send you notifications on our products and
            services. You can unsubscribe from notifications at any time in your
            settings. For additional info please refer to our{" "}
            <a href="#privacy-policy" style={{ textDecoration: "none" }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    );
  } else if (isPasswordStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <h3 className={styles.welcomeTitle}>Welcome back!</h3>
        <form onSubmit={handleLogin} noValidate>
          <div
            className={styles.input}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <IoCaretBack
              style={{ marginRight: "9px" }}
              onClick={() => setStep("email")}
            />
            <span>{formValues.email}</span>
          </div>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Your Password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {error ? error : null}
          <button type="submit" className={styles.continueBtn}>
            Sign In
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
  }

  return <Modal onClose={onClose}>{currentStep}</Modal>;

  // return (
  //   <Modal onClose={onClose}>
  //     <div className={styles.modalForm}>
  //       {step === "email" ? (
  //         <>
  //           <button onClick={onClose} className={styles.closeBtn} title="Close">
  //             <IoMdClose />
  //           </button>
  //           <div className={styles.socialButtonGroup}>
  //             <button className="social-login-btn facebook">
  //               <img
  //                 src="https://secure.sndcdn.com/assets/facebook-8d9809.png"
  //                 alt=""
  //                 height="15px"
  //                 width="15px"
  //                 style={{ marginRight: "0.5rem" }}
  //               />
  //               <div>Continue with Facebook</div>
  //             </button>
  //             <button className="social-login-btn google">
  //               <img
  //                 src="https://secure.sndcdn.com/assets/google-a6c367.svg"
  //                 alt=""
  //                 height="15px"
  //                 width="15px"
  //                 style={{ marginRight: "0.5rem" }}
  //               />
  //               <div>Continue with Google</div>
  //             </button>
  //             <button className="social-login-btn apple">
  //               <img
  //                 src="https://secure.sndcdn.com/assets/apple-0a88d2.svg"
  //                 alt=""
  //                 height="28px"
  //                 width="28px"
  //                 style={{ marginRight: "0.3rem", display: "block" }}
  //               />
  //               <div>Continue with Apple</div>
  //             </button>
  //           </div>
  //           <div className={styles.or}>or</div>
  //           <form onSubmit={handleNextStep} noValidate>
  //             <input
  //               className={`${styles.input} ${error && styles.invalid}`}
  //               type="email"
  //               name="email"
  //               placeholder="Your email address or profile URL"
  //               value={formValues.email}
  //               onChange={handleInputChange}
  //             />
  //             {error ? <p className={styles.invalidMessage}>{error}</p> : null}
  //             <button type="submit" className={styles.continueBtn}>
  //               Continue
  //             </button>
  //           </form>
  //           <div className={styles.modalFooter}>
  //             <a href="#help" className={styles.needHelpLink}>
  //               Need help?
  //             </a>
  //             <p className={styles.privacyPolicy}>
  //               When registering, you agree that we may use your provided data
  //               for the registration and to send you notifications on our
  //               products and services. You can unsubscribe from notifications at
  //               any time in your settings. For additional info please refer to
  //               our{" "}
  //               <a href="#privacy-policy" style={{ textDecoration: "none" }}>
  //                 Privacy Policy
  //               </a>
  //               .
  //             </p>
  //           </div>
  //         </>
  //       ) : (
  //         <>
  //           <button onClick={onClose} className={styles.closeBtn} title="Close">
  //             <IoMdClose />
  //           </button>
  //           <h3 className={styles.welcomeTitle}>Welcome back!</h3>
  //           <form onSubmit={handleLogin} noValidate>
  //             <div
  //               className={styles.input}
  //               style={{
  //                 display: "inline-flex",
  //                 alignItems: "center",
  //                 marginBottom: "14px",
  //               }}
  //             >
  //               <IoCaretBack
  //                 style={{ marginRight: "9px" }}
  //                 onClick={() => setStep("email")}
  //               />
  //               <span>{formValues.email}</span>
  //             </div>
  //             <input
  //               className={styles.input}
  //               type="password"
  //               name="password"
  //               placeholder="Your Password"
  //               value={formValues.password}
  //               onChange={handleInputChange}
  //             />
  //             {error ? error : null}
  //             <button type="submit" className={styles.continueBtn}>
  //               Sign In
  //             </button>
  //           </form>
  //           <p
  //             style={{
  //               textAlign: "center",
  //               fontSize: "12px",
  //               color: "#044dd2",
  //               margin: 0,
  //               paddingBottom: "80px",
  //             }}
  //           >
  //             Don't know your password?
  //           </p>
  //         </>
  //       )}
  //     </div>
  //   </Modal>
  // );
}
