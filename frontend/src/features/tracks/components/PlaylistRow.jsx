import { AiFillLock } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import styles from "./PlaylistModal.module.css";

export function PlaylistRow({ playlist }) {
  return (
    <div className={styles.playlistRow}>
      <div
        className={styles.playlistCover}
        style={{
          background: playlist.cover
            ? playlist.cover
            : "linear-gradient(135deg, rgb(42, 156, 240) 0%, rgb(11, 10, 10) 100%)",
        }}
      />
      <div className={styles.inner}>
        <div>
          <h4 className={styles.playlistRowTitle}>{playlist.title}</h4>
          <div className={styles.playlistRowCount}>
            <BsSoundwave />{" "}
            <span className={styles.count}>{playlist.plays}</span>
          </div>
        </div>
        <div className={styles.right}>
          {playlist.privacy === "private" && (
            <AiFillLock
              style={{
                verticalAlign: "top",
                color: "var(--primary-orange)",
              }}
            />
          )}
          <button className={styles.addBtn}>Add to playlist</button>
        </div>
      </div>
    </div>
  );
}
