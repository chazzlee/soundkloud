import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { playlistStarted, removeFromPlaylistAsync } from "../store";

export function PlaylistTrackList({ playlist }) {
  const dispatch = useDispatch();

  const handleStartPlaylist = useCallback(
    (playlist) => {
      dispatch(playlistStarted(playlist));
    },
    [dispatch]
  );

  const handleRemoveFromPlaylist = useCallback(
    (playlistId, trackId) => {
      dispatch(removeFromPlaylistAsync(playlistId, trackId));
    },
    [dispatch]
  );

  return (
    <ul>
      <button onClick={() => handleStartPlaylist(playlist)}>
        Play playlist
      </button>
      {playlist.tracks.map((track) => (
        <li
          key={track.id}
          style={{
            padding: "12px",
            border: "1px solid black",
            marginBottom: "4px",
          }}
        >
          {track.artist} - {track.title}
          <button>Play</button>
          <button
            type="button"
            onClick={() => handleRemoveFromPlaylist(playlist.id, track.id)}
            style={{ color: "red" }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
