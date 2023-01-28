import { useSelector } from "react-redux";
import { selectPlaylists } from "../../../playlists/store";
import { ProfileItemCard } from "../ProfileItemCard";

export function UserPlaylists() {
  // TODO: selecting all playlists for now...need to select by user id/slug
  const userPlaylists = useSelector(selectPlaylists);

  return (
    <div className="user-profile-tab-page">
      {userPlaylists.map((playlist) => (
        <ProfileItemCard key={playlist.id} item={playlist} type={"playlist"} />
      ))}
    </div>
  );
}
