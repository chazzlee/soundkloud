import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../auth/store";
import { fetchPlaylistsAsync, selectPlaylists } from "../../../store";
import { Playlist } from "../ListItems/Playlist";

export function AddToPlaylistTab({ track }) {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const [filter, setFilter] = useState("");

  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchPlaylistsAsync(currentUser?.id));
    }
  }, [dispatch, currentUser?.id]);

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
