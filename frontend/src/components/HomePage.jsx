import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/reducers/auth";
import { AuthModal } from "./AuthModal";

export function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.current);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {currentUser && (
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      )}
      <h1>Home Page</h1>
      <button onClick={() => setModalOpen(true)}>Sign In</button>
      {modalOpen ? (
        <AuthModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            console.log("logged in!");
          }}
        />
      ) : null}
    </div>
  );
}
