import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../context/Modal";
import { PlaylistRow } from "../../../tracks/components/PlaylistRow";
import {
  fetchPlaylistsAsync,
  selectPlaylists,
  selectPlaylistsLoaded,
} from "../../store";
import "./AddToPlaylist.css";

const TABS = Object.freeze({
  ADD: "add",
  CREATE: "create",
  SUCCESS: "success",
});

export function AddToPlaylistModal({ track, onClose }) {
  console.log(track);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TABS.ADD);

  const handleTabChange = useCallback((tab) => {
    setTab(tab);
  }, []);

  const playlistsLoaded = useSelector(selectPlaylistsLoaded);
  // TODO: only playlists by current user
  const playlists = useSelector(selectPlaylists);

  useEffect(() => {
    if (!playlistsLoaded) {
      dispatch(fetchPlaylistsAsync());
    }
  }, [dispatch, playlistsLoaded]);

  return (
    <Modal onClose={onClose}>
      <div className="add-to-playlist-container">
        <header className="add-to-playlist-header">
          <nav>
            <ul className="add-to-playlist-modal-tabs">
              <li
                className={`add-to-playlist-tab ${
                  tab === TABS.ADD ? "selected" : ""
                }`}
                role="button"
                onClick={() => handleTabChange(TABS.ADD)}
              >
                Add to playlist
              </li>
              <li
                className={`add-to-playlist-tab ${
                  tab === TABS.CREATE ? "selected" : ""
                }`}
                role="button"
                onClick={() => handleTabChange(TABS.CREATE)}
              >
                Create a playlist
              </li>
            </ul>
          </nav>
        </header>
        {tab === TABS.ADD && (
          <section className="add-to-playlist-section">
            <input
              type="search"
              placeholder="Filter playlists"
              className="playlist-search-input"
              name="filter"
              autoFocus
            />
            <div className="playlist-list">
              {playlists.map((playlist) => (
                <PlaylistRow
                  key={playlist.id}
                  track={track}
                  playlist={playlist}
                />
              ))}
            </div>
          </section>
        )}
        {tab === TABS.CREATE && (
          <section className="add-to-playlist-section">
            <h2>CREATE</h2>
          </section>
        )}
      </div>
    </Modal>
  );
}
