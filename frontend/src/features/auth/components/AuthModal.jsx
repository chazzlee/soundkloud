import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
import { loginUser, registerUser } from "../store";
import { checkIfEmailExists } from "../../../api/auth";
import { wait } from "../../../utils/wait";
import { AuthWizard } from "./AuthWizard";

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

  const isPasswordStep = step === "password";
  const isCreateNewStep = step === "create";

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
    const response = await checkIfEmailExists(formValues.email);

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
          resetFormValues();
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
          resetFormValues();
          resetProfileValues();
          onSuccess();
        }
      })
      .catch(async (response) => {
        const data = await response.json();
        setSubmitted(false);
        setServerError(data.errors[0]);
      });
  };

  return (
    <Modal onClose={onClose}>
      <AuthWizard
        step={step}
        values={{ email: formValues.email, password: formValues.password }}
        profileValues={{
          displayName: profileValues.displayName,
          age: profileValues.age,
          gender: profileValues.gender,
        }}
        submitted={submitted}
        errorMessages={{ email: errors.email, password: errors.password }}
        profileErrorMessages={{
          displayName: profileErrors.displayName,
          age: profileErrors.age,
          gender: profileErrors.gender,
        }}
        serverError={serverError}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        onSuccess={onSuccess}
        onAccept={handleAcceptAndContinue}
        onClose={onClose}
        onRegister={handleRegister}
        onLogin={handleLogin}
        onChangeAuth={handleInputChange}
        onChangeProfile={handleProfileChange}
      />
    </Modal>
  );
}
