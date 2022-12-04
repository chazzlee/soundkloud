import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, selectCurrentUser } from "../features/auth/store";
import { LoginModal } from "../features/auth/components/LoginModal";
import { RegisterModal } from "../features/auth/components/RegisterModal";

//TODO: combine navigation from LandingPage/combine modals
export function TopNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.ok) {
        navigate("/logout");
      }
    });
  };

  return (
    <>
      <div style={{ borderBottom: "1px solid black", marginBottom: "20px" }}>
        <NavLink to={"/"}>
          <h1>SOUNDCLOUD</h1>
        </NavLink>
        <div>
          <NavLink to={"/discover"}>Home</NavLink>
          <NavLink to={"/feed"}>Feed</NavLink>
          <NavLink to={"/library"}>Library</NavLink>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search for artists, bands, tracks, podcasts"
          />
        </div>
        <div>
          {!currentUser && (
            <>
              <button onClick={() => setLoginModalOpen(true)}>Sign in</button>
              <button onClick={() => setRegisterModalOpen(true)}>
                Create account
              </button>
            </>
          )}
          {currentUser && <button onClick={handleLogout}>Logout</button>}

          <NavLink to={"/upload"}>Upload</NavLink>
        </div>
      </div>
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
    </>
  );
}
