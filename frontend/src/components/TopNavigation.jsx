import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, selectCurrentUser } from "../features/auth/store";
import { AuthModal } from "../features/auth/components/AuthModal";
import { ReactComponent as Logo } from "./soundcloud-logo.svg";
import styles from "./TopNavigation.module.css";

import { BsFillBellFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

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
    <header className={styles.topNavigationContainer}>
      <div className={styles.innerContainer}>
        <nav className={styles.navGroup}>
          <div className={`${styles.homeWithLogo} ${styles.logoHighlight}`}>
            <NavLink to={"/"} className={styles.navLogoLink}>
              <span className={styles.navLogo}>LOGO</span>
            </NavLink>
            <NavLink to={"/discover"}>
              <span className={styles.homeLink}>Home</span>
            </NavLink>
          </div>
          <div className={styles.navBtn} style={{ borderRight: "none" }}>
            <NavLink to={"/feed"}>Feed</NavLink>
          </div>
          <div className={styles.navBtn}>
            <NavLink to={"/you/library"}>Library</NavLink>
          </div>
        </nav>
        <div className={styles.searchBarContainer}>
          <input
            id="search"
            type="search"
            name="search"
            className={styles.searchBar}
            placeholder="Search"
            autoComplete="off"
          />
          <span
            style={{
              position: "absolute",
              fontSize: "20px",
              top: 2,
              right: 6,
              color: "darkgray",
              cursor: "pointer",
            }}
          >
            <IoSearch />
          </span>
        </div>

        <nav className={styles.navGroup}>
          <div className={styles.navBtn}>
            <NavLink to={"/upload"}>Upload</NavLink>
          </div>
          <div className={styles.profileTrigger}>
            <img
              src="https://via.placeholder.com/26"
              alt="Profile"
              className={styles.profileImage}
            />
            <span>APEX1</span>
          </div>
          <div>
            <BsFillBellFill />
          </div>
          <div>
            <IoMdMail />
          </div>
          <div>
            <FiMoreHorizontal />
          </div>
        </nav>
      </div>
    </header>
  );
}

//   <NavLink to={"/"}>
//     <h1>SOUNDCLOUD</h1>
//   </NavLink>
//   <div>
//     <NavLink to={"/discover"}>Home</NavLink>
//     <NavLink to={"/feed"}>Feed</NavLink>
//     <NavLink to={"/library"}>Library</NavLink>
//   </div>
//   <div>
//     <input
//       type="search"
//       placeholder="Search for artists, bands, tracks, podcasts"
//     />
//   </div>
//   <div>
//     {!currentUser && (
//       <>
//         <button onClick={() => setAuthModalOpen(true)}>Sign in</button>
//         <button onClick={() => setAuthModalOpen(true)}>
//           Create account
//         </button>
//       </>
//     )}
//     {currentUser && <button onClick={handleLogout}>Logout</button>}

//     <NavLink to={"/upload"}>Upload</NavLink>
//   </div>
// </div>
// {authModalOpen ? (
//   <AuthModal
//     onClose={() => setAuthModalOpen(false)}
//     onSuccess={() => {
//       setAuthModalOpen(false);
//       navigate("/discover");
//     }}
//   />
// ) : null}
