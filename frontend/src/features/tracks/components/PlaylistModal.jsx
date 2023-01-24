import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import {
  createNewPlaylistAsync,
  fetchPlaylistsAsync,
  selectPlaylists,
} from "../../playlists/store";
import { AddToPlaylistTab } from "./AddToPlaylistTab";
import { CreatePlaylistTab } from "./CreatePlaylistTab";
import { GoToPlaylistTab } from "./GoToPlaylistTab";
import styles from "./PlaylistModal.module.css";

const TABS = Object.freeze({
  ADD: "add",
  CREATE: "create",
  SUCCESS: "success",
});

const initialFormData = {
  title: "",
  privacy: "public",
};

export function PlaylistModal({ track, onClose }) {
  const dispatch = useDispatch();
  const [playlistSlug, setPlaylistSlug] = useState("");

  const [playlistModalTab, setPlaylistModalTab] = useState(TABS.ADD);
  const handleTabChange = useCallback((tab) => {
    setPlaylistModalTab(tab);
  }, []);

  const [playlistFormData, setPlaylistFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setPlaylistFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const playlists = useSelector(selectPlaylists);

  const handleCreatePlaylist = (e) => {
    e.preventDefault();

    const playlist = {
      title: playlistFormData.title,
      privacy: playlistFormData.privacy,
      tracks: [track.id],
    };

    dispatch(createNewPlaylistAsync(playlist)).then((data) => {
      setPlaylistSlug(data.slug);
      setPlaylistFormData(initialFormData);
      setPlaylistModalTab(TABS.SUCCESS);
    });
  };

  useEffect(() => {
    // TODO: only dispatch if playlist not yet loaded
    dispatch(fetchPlaylistsAsync());
  }, [dispatch]);

  return (
    <Modal onClose={onClose} className={styles.modal}>
      <PlaylistModalHeader
        activeTab={playlistModalTab}
        onTabChange={handleTabChange}
      />
      <div className={styles.container}>
        {playlistModalTab === TABS.ADD && (
          <AddToPlaylistTab track={track} playlists={playlists} />
        )}
        {playlistModalTab === TABS.CREATE && (
          <CreatePlaylistTab
            track={track}
            formData={playlistFormData}
            onChange={handleChange}
            onSubmit={handleCreatePlaylist}
          />
        )}
        {playlistModalTab === TABS.SUCCESS && (
          <GoToPlaylistTab trackToAdd={track} playlistSlug={playlistSlug} />
        )}
      </div>
    </Modal>
  );
}

function PlaylistModalHeader({ activeTab, onTabChange }) {
  return (
    <div className={styles.playlistHeader}>
      <h2
        className={`${styles.playlistHeading} ${
          activeTab === TABS.ADD ? styles.active : ""
        }`}
        role="button"
        onClick={() => onTabChange(TABS.ADD)}
      >
        Add to playlist
      </h2>
      <h2
        className={`${styles.playlistHeading} ${
          activeTab === TABS.CREATE || activeTab === TABS.SUCCESS
            ? styles.active
            : ""
        }`}
        role="button"
        onClick={() => onTabChange(TABS.CREATE)}
      >
        Create a playlist
      </h2>
    </div>
  );
}
