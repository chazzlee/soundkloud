import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserTracks } from "../../../tracks/store";
import { ProfileItemCard } from "../ProfileItemCard";
import { StartButton } from "../StartButton";

export function UserTracks() {
  // TODO: FIXME: currentUser...needs to be user by id/slug
  const userTracks = useSelector(selectUserTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const handleIsPlaying = useCallback((state) => {
    setIsPlaying(state.isPlaying);
    setPlayingId(state.playingId);
  }, []);

  return (
    <div className="user-profile-tab-page">
      <StartButton hasUploads={!!userTracks.length} />
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
