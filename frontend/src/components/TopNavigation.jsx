import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, selectCurrentUser } from "../features/auth/store";
import { AuthModal } from "../features/auth/components/AuthModal";
import styles from "./TopNavigation.module.css";

import { BsFillBellFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BiCaretDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoPersonSharp } from "react-icons/io5";

export function TopNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

  const handleShowProfileDropdown = () => {
    setSettingsDropdownOpen(false);
    setProfileDropdownOpen((prev) => !prev);
  };
  const handleShowSettingsDropdown = () => {
    setProfileDropdownOpen(false);
    setSettingsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setSettingsDropdownOpen(false);
    dispatch(logoutUser()).then((response) => {
      if (response.ok) {
        navigate("/logout");
      }
    });
  };

  const [from, setFrom] = useState("/discover");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.navGroupLeft}>
            <div className={styles.navLogo}>
              <a href="/">SOUNDKLOUD</a>
            </div>
            <nav className={styles.navLinksLeft}>
              <ul>
                <li className={styles.navBtn}>
                  <NavLink to={"/discover"} className={styles.navLink}>
                    Home
                  </NavLink>
                </li>
                <li className={styles.navBtn}>
                  <NavLink to={"/feed"} className={styles.navLink}>
                    Feed
                  </NavLink>
                </li>
                <li className={styles.navBtn}>
                  <NavLink to={"/library"} className={styles.navLink}>
                    Library
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.navGroupMiddle}>
            <input
              id="search"
              type="text"
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

          <div className={styles.navGroupRight}>
            <nav className={styles.navLinksRight}>
              <ul>
                <li className={`${styles.navBtn} ${styles.right}`}>
                  {currentUser ? (
                    <NavLink to={"/upload"} className={styles.navLink}>
                      Upload
                    </NavLink>
                  ) : (
                    <button
                      className={styles.navLink}
                      onClick={() => {
                        setAuthModalOpen(true);
                        setFrom("/upload");
                      }}
                    >
                      Upload
                    </button>
                  )}
                </li>
                {currentUser ? (
                  <li
                    className={`${styles.navBtn} 
                ${styles.right} 
                ${styles.dropdownTrigger} 
                ${profileDropdownOpen && styles.open}`}
                    onClick={handleShowProfileDropdown}
                    style={{ width: "50%" }}
                    role="button"
                  >
                    <button style={{ paddingBottom: "10px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          marginRight: "6px",
                          verticalAlign: "text-top",
                          fontSize: "14px",
                          color: "var(--primary-orange)",
                        }}
                      >
                        <CgProfile />
                      </span>
                      <span className={styles.truncate}>
                        {currentUser.displayName}
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "4px",
                          fontSize: "14px",
                          verticalAlign: "text-top",
                        }}
                      >
                        <BiCaretDown />
                      </span>
                    </button>
                    {profileDropdownOpen ? (
                      <div className={styles.profileDropdown}>
                        <NavLink className={styles.profileDropdownBtn} to={`/`}>
                          <div
                            style={{ marginRight: "4px", paddingLeft: "8px" }}
                          >
                            <IoPersonSharp
                              style={{ verticalAlign: "middle" }}
                            />
                          </div>
                          <div>Profile</div>
                        </NavLink>
                      </div>
                    ) : null}
                  </li>
                ) : (
                  <li
                    className={`${styles.navBtn} 
                ${styles.right} 
                ${styles.dropdownTrigger} ${styles.signInBtn}`}
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Sign in
                  </li>
                )}
                <div className={`${styles.right} ${styles.iconGroup}`}>
                  <div className={styles.iconContainer}>
                    <button className={styles.iconBtn}>
                      <BsFillBellFill />
                    </button>
                  </div>
                  <div className={styles.iconContainer}>
                    <button className={styles.iconBtn}>
                      <IoMdMail />
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <button
                      className={styles.iconBtn}
                      onClick={handleShowSettingsDropdown}
                    >
                      <FiMoreHorizontal className={styles.settingsBtn} />
                    </button>
                    {settingsDropdownOpen ? (
                      <div className={styles.settingsDropdown}>
                        <div
                          role="button"
                          onClick={handleLogout}
                          className={styles.logoutBtn}
                        >
                          Sign out
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {authModalOpen ? (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            setAuthModalOpen(false);
            navigate(from);
          }}
        />
      ) : null}
    </>
  );
}
