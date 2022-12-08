import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
import { loginUser, registerUser } from "../store";
import { IoMdClose } from "react-icons/io";

import styles from "./AuthModal.module.css";
import { AuthModalFooter } from "./AuthModalFooter";
import { AuthErrorMessage } from "./AuthErrorMessage";
import { AuthInput } from "./AuthInput";
import { EmailDisplayWithBack } from "./EmailDisplayWithBack";
import { GenderSelectInput } from "./GenderSelectInput";
import { SocialButtonGroup } from "./SocialButtonGroup";
import { PasswordInput } from "./PasswordInput";
import { AuthButton } from "./AuthButton";
import { checkIfEmailExists } from "../../../api/auth";
import { wait } from "../../../utils/wait";

const profileErrorMessages = {
  displayName: "Enter your display name.",
  age: "Enter your age.",
  gender: "Please indicate your gender.",
};

const initialFormValues = {
  email: "",
  password: "",
};

const initialProfileValues = {
  displayName: "",
  age: "",
  gender: "",
};

export function AuthModal({ onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState("email");

  const isEmailStep = step === "email";
  const isPasswordStep = step === "password";
  const isCreateNewStep = step === "create";
  const isCreateProfileStep = step === "profile";

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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

  const resetFormValues = () => {
    setFormValues(initialFormValues);
  };

  const resetFormErrors = () => {
    setErrors(initialFormValues);
  };

  const resetProfileValues = () => {
    setProfileValues(initialProfileValues);
  };

  const resetProfileErrors = () => {
    setProfileErrors(initialProfileValues);
  };

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

    setSubmitted(true);
    //-===============================//
    const response = await checkIfEmailExists();

    wait(500).then(async () => {
      const data = await response.json();
      if (data.success) {
        setStep("password");
      } else {
        setStep("create");
      }
      setSubmitted(false);
    });
  };

  const handlePrevStep = () => {
    resetFormErrors();
    setServerError(null);
    setFormValues((prev) => ({ ...prev, password: "" }));
    setStep("email");
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleLogin = (event) => {
    event.preventDefault();

    setServerError(null);

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

    setSubmitted(true);

    dispatch(
      loginUser({
        email: formValues.email,
        password: formValues.password,
      })
    )
      .then((response) => {
        if (response.ok) {
          setSubmitted(false);
          onSuccess();
        }
      })
      .catch(async (response) => {
        const data = await response.json();
        setSubmitted(false);
        setServerError(data.errors[0]);
      });
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

  const validateProfile = (profileValues) => {
    resetProfileErrors();

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

    const isProfileValid = validateProfile(profileValues);

    if (!isProfileValid) {
      return;
    }

    const newUser = {
      ...formValues,
      profile: {
        ...profileValues,
      },
    };
    setSubmitted(true);
    dispatch(registerUser(newUser))
      .then((response) => {
        if (response.ok) {
          setSubmitted(false);
          onSuccess();
        }
      })
      .catch(async (response) => {
        const data = await response.json();
        setSubmitted(false);
        setServerError(data.errors[0]);
      });
  };

  let currentStep = null;

  if (isEmailStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <SocialButtonGroup onSuccess={onSuccess} />
        <div className={styles.or}>or</div>
        <form onSubmit={handleNextStep} noValidate>
          <AuthInput
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Your email address or profile URL"
            errorMessage={errors.email}
            autoFocus={true}
          />
          <AuthButton label={"Continue"} disabled={submitted} />
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
          <EmailDisplayWithBack
            displayValue={formValues.email}
            onClick={handlePrevStep}
          />
          <PasswordInput
            value={formValues.password}
            onChange={handleInputChange}
            errorMessage={errors.password}
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
  } else if (isCreateNewStep) {
    currentStep = (
      <div className={styles.modalForm}>
        <button onClick={onClose} className={styles.closeBtn} title="Close">
          <IoMdClose />
        </button>
        <h3 className={styles.modalTitle}>Create your SoundCloud account</h3>
        <form onSubmit={handleAcceptAndContinue} noValidate>
          <EmailDisplayWithBack
            displayValue={formValues.email}
            onClick={handlePrevStep}
          />
          <PasswordInput
            value={formValues.password}
            onChange={handleInputChange}
            errorMessage={errors.password}
            withLabel={true}
            autoFocus={true}
          />
          <AuthButton label={"Accept & continue"} />
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
              autoFocus={true}
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

          <GenderSelectInput
            value={profileValues.gender}
            onChange={handleProfileChange}
            errorMessage={profileErrors.gender}
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

  return <Modal onClose={onClose}>{currentStep}</Modal>;
}
