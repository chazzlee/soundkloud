import { useSelector } from "react-redux";
import { selectUserTracks } from "../../../tracks/store";
import { ProfileItemCard } from "../ProfileItemCard";

export function UserTracks() {
  // TODO: FIXME: currentUser...needs to be user by id/slug
  const userTracks = useSelector(selectUserTracks);

  return (
    <div className="user-profile-tab-page">
      <div className="user-tracks-list">
        {userTracks.map((track) => (
          <ProfileItemCard key={track.id} item={track} type={"track"} />
        ))}
      </div>
    </div>
  );
}
