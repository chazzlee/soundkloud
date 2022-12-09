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

        <div className={styles.navGroupRight}>
          <nav className={styles.navLinksRight}>
            <ul>
              <li className={`${styles.navBtn} ${styles.right}`}>
                <NavLink to={"/upload"} className={styles.navLink}>
                  Upload
                </NavLink>
              </li>
              <li className={`${styles.navBtn} ${styles.right}`}>
                <button onClick={() => console.log("show menu")}>APEX1</button>
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "4px",
                    fontSize: "14px",
                    verticalAlign: "middle",
                  }}
                >
                  <BiCaretDown />
                </span>
              </li>
              <li
                className={`${styles.navBtn} ${styles.right} `}
                onClick={handleLogout}
              >
                <button>
                  <BsFillBellFill />
                </button>
                <button>
                  <IoMdMail />
                </button>
                <button>
                  <FiMoreHorizontal />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
