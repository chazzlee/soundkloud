import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserTracks } from "../../../tracks/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { StartUploadingButton } from "../StartUploadingButton";

export function UserTracks() {
  // TODO: FIXME: currentUser...needs to be user by id/slug
  const userTracks = useSelector(selectUserTracks);

  return (
    <div className="user-profile-tab-page">
      <StartUploadingButton hasUploads={!!userTracks.length} />
      <div className="user-tracks-list">
        {userTracks.map((track) => (
          <ProfileItemCard key={track.id} item={track} type={"track"} />
        ))}
      </div>
    </div>
  );
}
