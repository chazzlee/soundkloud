import { useEffect, useState } from "react";
import { fetchPlaylistsAsync, selectPlaylists } from "../../playlists/store";
import { useDispatch, useSelector } from "react-redux";
import { PlaylistRow } from "./PlaylistRow";
import styles from "./PlaylistModal.module.css";

export function AddToPlaylistTab() {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const [filteredPlaylists, setFilterPlaylists] = useState(playlists);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchPlaylistsAsync());
  }, [dispatch]);

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
        {filteredPlaylists?.map((playlist) => (
          <PlaylistRow key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </>
  );
}
