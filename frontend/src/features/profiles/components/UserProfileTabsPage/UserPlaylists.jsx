import { useSelector } from "react-redux";
import { selectPlaylists } from "../../../playlists/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { PlaylistTrackList } from "../PlaylistTrackList";
import { StartButton } from "../StartButton";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../../auth/store";

export function UserPlaylists() {
  const userPlaylists = useSelector(selectPlaylists);
  const { slug } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const isOwner = slug === currentUser.slug;

  return (
    <div className="user-profile-tab-page">
      {isOwner ? <StartButton hasUploads={!!userPlaylists.length} /> : null}
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
