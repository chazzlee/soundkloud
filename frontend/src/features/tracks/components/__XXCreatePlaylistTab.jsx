import { useState } from "react";
import { TrackRow } from "./TrackRow";
import styles from "./PlaylistModal.module.css";

export function CreatePlaylistTab({ track, formData, onChange, onSubmit }) {
  const [trackToAdd, setTrackToAdd] = useState(track);
  const handleRemove = () => {
    setTrackToAdd(null);
  };

  return (
    <>
      <label htmlFor="title" className={styles.label}>
        Playlist title <span style={{ color: "#cf0000" }}>*</span>
      </label>
      <input
        type="text"
        className={styles.searchForPlaylists}
        name="title"
        value={formData.title}
        autoFocus
        onChange={onChange}
      />
      <form className={styles.saveForm} onSubmit={onSubmit}>
        <div>
          <div style={{ fontSize: "12px" }}>
            Privacy:{" "}
            <input
              type="radio"
              name="privacy"
              value="public"
              onChange={onChange}
              defaultChecked
            />{" "}
            Public{" "}
            <input
              type="radio"
              name="privacy"
              value="private"
              onChange={onChange}
            />{" "}
            Private
          </div>
        </div>
        <button className={styles.saveBtn}>Save</button>
      </form>
      <div className={styles.tracks}>
        <TrackRow track={trackToAdd} onRemove={handleRemove} />
        <TrackRow />
        <TrackRow />
        <TrackRow />
      </div>
    </>
  );
}
