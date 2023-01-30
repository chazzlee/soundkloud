import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../../auth/store";
import { selectPlaylists } from "../../../playlists/store";
import { selectUserTracksBySlug } from "../../../tracks/store";
import { PlaylistTrackList } from "../PlaylistTrackList";
import { ProfileItemCard } from "../ProfileItemCard";
import { StartButton } from "../StartButton";

export function UserAll() {
  const { slug } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const isOwner = slug === currentUser.slug;

  const userTracks = useSelector((state) =>
    selectUserTracksBySlug(state, slug)
  );
  const userPlaylists = useSelector(selectPlaylists);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const handleIsPlaying = useCallback((state) => {
    setIsPlaying(state.isPlaying);
    setPlayingId(state.playingId);
  }, []);

  return (
    <div className="user-profile-tab-page">
      {isOwner ? <StartButton hasUploads={!!userTracks.length} /> : null}
      {userTracks.length && userPlaylists.length ? (
        <h2 className="user-profile-tab-heading">Recent</h2>
      ) : null}

      <div className="user-tracks-list">
        {userTracks.map((track) => (
          <ProfileItemCard
            key={track.id}
            item={track}
            type={"track"}
            playingId={playingId}
            isPlaying={isPlaying}
            onPlaying={handleIsPlaying}
          />
        ))}
      </div>
      <div className="user-playlists-list">
        {userPlaylists.map((playlist) => (
          <ProfileItemCard
            key={playlist.id}
            item={playlist}
            type={"playlist"}
            isPlaying={isPlaying}
            onPlaying={handleIsPlaying}
          >
            <PlaylistTrackList tracks={playlist.tracks} />
          </ProfileItemCard>
        ))}
      </div>
    </div>
  );
}
