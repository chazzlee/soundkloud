export function PlaylistTrackList({ playlist }) {
  const handleStartPlaylist = () => {};

  return (
    <ul>
      <button onClick={handleStartPlaylist}>Play playlist</button>
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
