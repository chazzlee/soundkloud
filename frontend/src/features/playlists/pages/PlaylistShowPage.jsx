import { useParams } from "react-router-dom";

export function PlaylistShowPage() {
  const { user, playlist } = useParams();

  return (
    <div>
      <h1>Playlist</h1>
      {JSON.stringify(user)}
      {JSON.stringify(playlist)}
    </div>
  );
}
