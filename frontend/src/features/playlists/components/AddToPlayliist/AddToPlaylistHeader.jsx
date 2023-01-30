import { TABS } from "./AddToPlaylistModal";

export function AddToPlaylistHeader({ tab, onTabChange }) {
  return (
    <header className="add-to-playlist-header">
      <nav>
        <ul className="add-to-playlist-modal-tabs">
          <li
            className={`add-to-playlist-tab ${
              tab === TABS.ADD ? "selected" : ""
            }`}
            role="button"
            onClick={() => onTabChange(TABS.ADD)}
          >
            Add to playlist
          </li>
          <li
            className={`add-to-playlist-tab ${
              tab === TABS.CREATE || tab === TABS.SUCCESS ? "selected" : ""
            }`}
            role="button"
            onClick={() => onTabChange(TABS.CREATE)}
          >
            Create a playlist
          </li>
        </ul>
      </nav>
    </header>
  );
}
