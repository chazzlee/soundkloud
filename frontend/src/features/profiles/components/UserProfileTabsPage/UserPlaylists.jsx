import { useSelector } from "react-redux";
import { selectPlaylists } from "../../../playlists/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { PlaylistTrackList } from "../PlaylistTrackList";
import { StartButton } from "../StartButton";

// TODO: only show 5 tracks
export function UserPlaylists() {
  // TODO: selecting all playlists for now...need to select by user id/slug
  const userPlaylists = useSelector(selectPlaylists);

  return (
    <div className="user-profile-tab-page">
      <StartButton hasUploads={!!userPlaylists.length} />
      <div className="user-playlists-list">
        {userPlaylists.map((playlist) => (
          <ProfileItemCard key={playlist.id} item={playlist} type={"playlist"}>
            <PlaylistTrackList tracks={playlist.tracks} />
          </ProfileItemCard>
        ))}
      </div>
    </div>
  );
}
