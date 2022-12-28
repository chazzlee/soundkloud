import { useEffect, useState } from "react";
import { PlaylistRow } from "./PlaylistRow";
import styles from "./PlaylistModal.module.css";

export function AddToPlaylistTab({ track, playlists }) {
  const [filteredPlaylists, setFilterPlaylists] = useState(playlists);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      setFilterPlaylists(
        playlists.filter((playlist) =>
          playlist.title.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, playlists]);

  return (
    <>
      <input
        type="search"
        placeholder="Filter playlists"
        className={styles.searchForPlaylists}
        name="filter"
        autoFocus
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={styles.playlists}>
        {filteredPlaylists.map((playlist) => (
          <PlaylistRow key={playlist.id} track={track} playlist={playlist} />
        ))}
      </div>
    </>
  );
}
