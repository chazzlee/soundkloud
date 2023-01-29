import { Link } from "react-router-dom";
import { TrackCover } from "../../../../components/TrackCover";
import "./PlaylistTrackRowItem.css";

// TODO Refactor with PlaylistTracksListItem
export function PlaylistTrackRowItem({ track, order }) {
  return (
    <div className="profile-playlist-track-row-item" key={track.id}>
      <Link
        to={track.permalink}
        aria-label="View track"
        className="track-cover-link"
        onClick={(e) => e.stopPropagation()}
      >
        <TrackCover coverUrl={track.cover} alt={track.title} size={20} />
      </Link>
      <p className="track-order">{order}</p>
      <Link
        className="track-uploader"
        to={`/${track.uploader.slug}`}
        aria-label="View uploader"
        onClick={(e) => e.stopPropagation()}
      >
        {track.uploader.displayName}
      </Link>
      <span style={{ margin: "0 4px", color: "#333" }}>-</span>
      <Link
        className="track-title"
        to={track.permalink}
        aria-label="View track"
        onClick={(e) => e.stopPropagation()}
      >
        [{track.artist}] {track.title}
      </Link>
    </div>
  );
}
