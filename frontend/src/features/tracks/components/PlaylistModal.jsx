import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
import { createNewPlaylistAsync } from "../../playlists/store";
import { AddToPlaylistTab } from "./AddToPlaylistTab";
import styles from "./PlaylistModal.module.css";
import { TrackRow } from "./TrackRow";

export function PlaylistModal({ track, onClose }) {
  const dispatch = useDispatch();
  const [playlistModalTab, setPlaylistModalTab] = useState("add");
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [createStep, setCreateStep] = useState("initial");
  const [trackToAdd, setTrackToAdd] = useState(track);

  const handleRemove = () => {
    setTrackToAdd(null);
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    const playlist = {
      title,
      privacy,
      tracks: [track.id],
    };

    dispatch(createNewPlaylistAsync(playlist));

    setTitle("");
    setPrivacy("public");
    setCreateStep("saved");
  };

  return (
    <Modal onClose={onClose} className={styles.modal}>
      <div className={styles.playlistHeader}>
        <h2
          className={`${styles.playlistHeading} ${
            playlistModalTab === "add" ? styles.active : ""
          }`}
          role="button"
          onClick={() => setPlaylistModalTab("add")}
        >
          Add to playlist
        </h2>
        <h2
          className={`${styles.playlistHeading} ${
            playlistModalTab === "create" ? styles.active : ""
          }`}
          role="button"
          onClick={() => setPlaylistModalTab("create")}
        >
          Create a playlist
        </h2>
      </div>
      <div className={styles.container}>
        {playlistModalTab === "add" ? (
          <AddToPlaylistTab />
        ) : createStep === "initial" ? (
          <>
            <label htmlFor="title" className={styles.label}>
              Playlist title <span style={{ color: "#cf0000" }}>*</span>
            </label>
            <input
              type="text"
              className={styles.searchForPlaylists}
              name="title"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <form className={styles.saveForm} onSubmit={handleCreatePlaylist}>
              <div>
                <div style={{ fontSize: "12px" }}>
                  Privacy:{" "}
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    onChange={(e) => setPrivacy(e.target.value)}
                    defaultChecked
                  />{" "}
                  Public{" "}
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    onChange={(e) => setPrivacy(e.target.value)}
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
        ) : (
          <div>
            <div className={styles.savedContainer}>
              <div className={styles.coverContainer} />
              <button className={styles.goBtn}>Go to playlist</button>
            </div>
            <div className={styles.tracks}>
              <TrackRow
                track={trackToAdd}
                style={{ color: "#444", fontWeight: 400 }}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
