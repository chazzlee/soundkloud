import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../../auth/components/LoginModal";
import { RegisterModal } from "../../auth/components/RegisterModal";

//TODO: combine modals
export function LandingPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Landing page</h1>
      <button onClick={() => setLoginModalOpen(true)}>Sign in</button>
      <button onClick={() => setRegisterModalOpen(true)}>Create account</button>
      {loginModalOpen ? (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onSuccess={() => {
            setLoginModalOpen(false);
            navigate("/discover");
          }}
        />
      ) : null}
      {registerModalOpen ? (
        <RegisterModal
          onClose={() => setRegisterModalOpen(false)}
          onSuccess={() => {
            setRegisterModalOpen(false);
            navigate("/discover");
          }}
        />
      ) : null}
    </div>
  );
}
