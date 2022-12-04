import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../../api/csrfFetch";
import { Modal } from "../../../context/Modal";
import { loginUser } from "../store";

//TODO: validations - form state errors etc...
export function RegisterModal({ onClose, onSuccess }) {
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

  const dispatch = useDispatch();

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleInputChange = (event) => {
    if (formState.submitted) {
      setError(null);
    }

    //TODO:! show error message again after first empty submit and second empty touch

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
      console.log("NO USER"); //TODO:
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

  return (
    <Modal onClose={onClose}>
      <h1>Register</h1>
      <div style={{ height: 400, width: 400 }}>
        {step === "email" ? (
          <>
            <button onClick={onClose}>x</button>
            <form onSubmit={handleNextStep} noValidate>
              <input
                type="email"
                name="email"
                placeholder="Your email address or profile URL"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {error ? error : null}
              <button type="submit">Continue</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={onClose}>x</button>
            <h3>Welcome back!</h3>
            <div>
              <p onClick={() => setStep("email")}>BACK</p>
              <input type="text" disabled value={formValues.email} />
            </div>
            <form onSubmit={handleLogin} noValidate>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formValues.password}
                onChange={handleInputChange}
              />
              {error ? error : null}
              <button type="submit">Sign In</button>
            </form>
            <p>Don't know your password?</p>
          </>
        )}
      </div>
    </Modal>
  );
}
