import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { playlistStarted } from "../store";

export function PlaylistTrackList({ playlist }) {
  const dispatch = useDispatch();

  const handleStartPlaylist = useCallback(
    (playlistId) => {
      dispatch(playlistStarted(playlistId));
    },
    [dispatch]
  );

  return (
    <ul>
      <button onClick={() => handleStartPlaylist(playlist.id)}>
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
        </li>
      ))}
    </ul>
  );
}
