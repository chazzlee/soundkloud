import { AiFillLock } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPlaylistAsync,
  removeFromPlaylistAsync,
  selectIsTrackInPlaylist,
} from "../../playlists/store";
import styles from "./__XXPlaylistModal.module.css";

// TODO: FIXME: REFACTOR and move

export function PlaylistRow({ track, playlist }) {
  const dispatch = useDispatch();

  const isTrackInPlaylist = useSelector((state) =>
    selectIsTrackInPlaylist(state, {
      playlistId: playlist.id,
      trackId: track.id,
    })
  );

  const handleAddToPlaylist = () => {
    dispatch(addToPlaylistAsync(playlist.id, track));
  };

  const handleRemoveFromPlaylist = () => {
    dispatch(removeFromPlaylistAsync(playlist.id, track.id));
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
          {isTrackInPlaylist ? (
            <button
              className={styles.addBtn}
              onClick={handleRemoveFromPlaylist}
              style={{
                borderColor: "var(--primary-orange)",
                color: "var(--primary-orange)",
              }}
            >
              Added
            </button>
          ) : (
            <button className={styles.addBtn} onClick={handleAddToPlaylist}>
              Add to playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
