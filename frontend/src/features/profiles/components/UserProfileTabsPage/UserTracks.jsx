import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../../auth/store";
import { selectUserTracksBySlug } from "../../../tracks/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { StartButton } from "../StartButton";

export function UserTracks() {
  const currentUser = useSelector(selectCurrentUser);
  const { slug } = useParams();
  const isOwner = slug === currentUser.slug;

  const userTracks = useSelector((state) =>
    selectUserTracksBySlug(state, slug)
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const handleIsPlaying = useCallback((state) => {
    setIsPlaying(state.isPlaying);
    setPlayingId(state.playingId);
  }, []);

  return (
    <div className="user-profile-tab-page">
      {isOwner ? <StartButton hasUploads={!!userTracks.length} /> : null}
      <div className="user-tracks-list">
        {userTracks.map((track) => (
          <ProfileItemCard
            key={track.id}
            item={track}
            type={"track"}
            isPlaying={isPlaying}
            playingId={playingId}
            onPlaying={handleIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}
