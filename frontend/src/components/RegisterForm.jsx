import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/reducers/auth";

export function RegisterForm({ onSuccess }) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email: formValues.email, password: formValues.password };
    dispatch(registerUser(user));
    // TODO:
    onSuccess();
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        {/* <div>
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          name="password_confirmation"
          id="passwordConfirmation"
          value={formValues.passwordConfirmation}
          onChange={handleChange}
        />
      </div> */}

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
