import { Link } from "react-router-dom";
import { TrackRow } from "../../../../tracks/components/TrackRow";

export function GoToPlaylistTab({ track, permalink }) {
  return (
    <>
      <div className="go-to-playlist-container">
        <div className="new-playlist-cover" />
        <div className="align-center">
          <Link className="go-to-playlist-link" to={permalink}>
            Go to playlist
          </Link>
        </div>
      </div>
      <div className="track-list">
        <TrackRow track={track} style={{ color: "#444", fontWeight: 400 }} />
      </div>
    </>
  );
}
