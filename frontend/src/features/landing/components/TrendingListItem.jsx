import { useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wait } from "../../../utils/wait";
import styles from "./LandingPage.module.css";

export function TrendingListItem({ playlist }) {
  const [showPlay, setShowPlay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      key={playlist.id}
      onMouseEnter={() => wait(120).then(() => setShowPlay(true))}
      onMouseLeave={() => wait(120).then(() => setShowPlay(false))}
      className={styles.trendingListItemContainer}
    >
      <img
        alt={playlist.title}
        aria-label={playlist.title}
        src={playlist.imageUrl}
        height={180}
        width={180}
        className={styles.trendingListItemImage}
        style={{
          filter: showPlay ? "brightness(90%)" : "none",
          transition: "filter ease-in 120ms",
        }}
      />
      <p className={styles.trendingListItemTitle}>{playlist.title}</p>
      <p className={styles.trendingListItemSubtitle}>{playlist.user}</p>
      {showPlay ? (
        <div className={styles.playOverlay}>
          <button
            title="Play"
            className={styles.circularPlayBtn}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => navigate("/discover")}
          >
            <IoMdPlay
              style={{
                fontSize: "28px",
                marginLeft: "3.5px",
                color: "white",
              }}
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
