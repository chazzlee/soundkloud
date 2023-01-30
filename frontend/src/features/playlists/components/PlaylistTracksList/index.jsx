import { AddToPlaylist } from "../AddToPlayliist/AddToPlaylist";
import { PlaylistTracksListItem } from "../PlaylistTracksListItem";
import "./PlaylistTracksList.css";

export function PlaylistTracksList({ playlistId, playlistTracks }) {
  return (
    <div className="playlist-tracks-list">
      {playlistTracks.length ? (
        playlistTracks.map((track, index) => (
          <PlaylistTracksListItem
            key={track.id}
            order={index + 1}
            track={track}
            playlistId={playlistId}
          />
        ))
      ) : (
        <div className="empty-playlist">
          <p>This playlist has no tracks yet.</p>
        </div>
      )}
    </div>
  );
}
