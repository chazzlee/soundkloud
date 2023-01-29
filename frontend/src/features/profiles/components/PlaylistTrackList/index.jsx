import { PlaylistTrackRowItem } from "../PlaylistTrackRowItem";
import "./PlaylistTrackList.css";

export function PlaylistTrackList({ tracks }) {
  return (
    <div className="profile-playlist-tracks">
      {tracks.map((track, index) => (
        <PlaylistTrackRowItem key={track.id} track={track} order={index + 1} />
      ))}
    </div>
  );
}
