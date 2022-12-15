import { Image } from "pure-react-carousel";
import { useState } from "react";
import { IoMdPlay } from "react-icons/io";
import styles from "./DiscoverPage.module.css";

export function PlayCard({ item, subcaption = "Related tracks" }) {
  const [showPlay, setShowPlay] = useState(false);

  return (
    <>
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setShowPlay(true)}
        onMouseLeave={() => setShowPlay(false)}
      >
        <Image
          src={
            item.cover ??
            "https://www.metalkingdom.net/album-cover-artwork/2018/02/3/3062-Nile-Annihilation-of-the-Wicked.jpg"
          }
          style={{
            objectFit: "cover",
            width: "174px",
            height: "174px",
            filter: showPlay ? "brightness(90%)" : "none",
            transition: "filter ease-in 60ms",
          }}
        />
        {showPlay ? (
          <div className={styles.playOverlay}>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("playing...", item.title);
              }}
              title="Play"
              className={styles.circularPlayBtn}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
      <div style={{ marginTop: "6px" }}>
        <p className={styles.title}>
          {item.artist} - {item.title}
        </p>
        <p className={styles.subcaption}>{subcaption}</p>
      </div>
    </>
  );
}
