import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylistsAsync,
  selectPlaylists,
  selectPlaylistsLoaded,
} from "../../../store";
import { Playlist } from "../ListItems/Playlist";

export function AddToPlaylistTab({ track }) {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const [filter, setFilter] = useState("");

  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);
  const playlistsLoaded = useSelector(selectPlaylistsLoaded);

  useEffect(() => {
    if (!playlistsLoaded) {
      dispatch(fetchPlaylistsAsync());
    }
  }, [dispatch, playlistsLoaded]);

  useEffect(() => {
    setFilteredPlaylists(
      playlists.filter((playlist) =>
        playlist.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, playlists]);

  return (
    <>
      <input
        type="search"
        className="form-control-input input-full"
        placeholder="Filter playlists"
        autoFocus
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="playlist-list">
        {filteredPlaylists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} track={track} />
        ))}
      </div>
    </>
  );
}
