import { AiFillLock } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToPlaylistAsync } from "../../playlists/store";
import styles from "./PlaylistModal.module.css";

export function PlaylistRow({ track, playlist }) {
  const dispatch = useDispatch();

  const handleAddToPlaylist = () => {
    dispatch(addToPlaylistAsync(playlist.id, track));
  };

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
          <button className={styles.addBtn} onClick={handleAddToPlaylist}>
            Add to playlist
          </button>
        </div>
      </div>
    </div>
  );
}
