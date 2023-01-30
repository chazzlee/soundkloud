import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylistsAsync,
  selectPlaylists,
  selectPlaylistsLoaded,
} from "../../../store";
import { Playlist } from "../ListItems/Playlist";

export function AddToPlaylistTab({ track }) {
  const dispatch = useDispatch();
  const { register, watch } = useForm({ defaultValues: { filter: "" } });
  const playlists = useSelector(selectPlaylists);

  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);
  const playlistsLoaded = useSelector(selectPlaylistsLoaded);

  useEffect(() => {
    if (!playlistsLoaded) {
      dispatch(fetchPlaylistsAsync());
    }
  }, [dispatch, playlistsLoaded]);

  // TODO: deleting filter should show whole playlist list
  useEffect(() => {
    const subscription = watch(({ filter }) =>
      setFilteredPlaylists((playlists) =>
        playlists.filter((playlist) =>
          playlist.title.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <input
        type="search"
        className="form-control-input input-full"
        placeholder="Filter playlists"
        autoFocus
        name="filter"
        {...register("filter")}
      />
      <div className="playlist-list">
        {filteredPlaylists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} track={track} />
        ))}
      </div>
    </>
  );
}
