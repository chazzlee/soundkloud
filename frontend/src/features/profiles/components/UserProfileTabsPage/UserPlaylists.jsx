import { useSelector } from "react-redux";
import { selectPlaylists, selectUserPlaylists } from "../../../playlists/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { PlaylistTrackList } from "../PlaylistTrackList";
import { useParams } from "react-router-dom";

export function UserPlaylists() {
  const { slug } = useParams();
  const userPlaylists = useSelector((state) =>
    selectUserPlaylists(state, slug)
  );

  return (
    <div className="user-profile-tab-page">
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
