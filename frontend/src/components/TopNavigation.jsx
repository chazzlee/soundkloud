import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, selectCurrentUser } from "../features/auth/store";
import { AuthModal } from "../features/auth/components/AuthModal";

//TODO: combine navigation from LandingPage/combine modals
export function TopNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [authModalOpen, setAuthModalOpen] = useState(false);

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
              <button onClick={() => setAuthModalOpen(true)}>Sign in</button>
              <button onClick={() => setAuthModalOpen(true)}>
                Create account
              </button>
            </>
          )}
          {currentUser && <button onClick={handleLogout}>Logout</button>}

          <NavLink to={"/upload"}>Upload</NavLink>
        </div>
      </div>
      {authModalOpen ? (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            setAuthModalOpen(false);
            navigate("/discover");
          }}
        />
      ) : null}
    </>
  );
}
