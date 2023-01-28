import { useSelector } from "react-redux";
import { selectPlaylists } from "../../../playlists/store";
import { PlaylistTrackRowItem } from "../PlaylistTrackRowItem";
import { ProfileItemCard } from "../ProfileItemCard";

export function UserPlaylists() {
  // TODO: selecting all playlists for now...need to select by user id/slug
  const userPlaylists = useSelector(selectPlaylists);

  return (
    <div className="user-profile-tab-page">
      <div className="user-playlists-list">
        {userPlaylists.map((playlist) => (
          <ProfileItemCard key={playlist.id} item={playlist} type={"playlist"}>
            <div className="profile-playlist-tracks">
              {playlist.tracks.map((track, index) => (
                <PlaylistTrackRowItem
                  key={track.id}
                  track={track}
                  order={index + 1}
                />
              ))}
            </div>
          </ProfileItemCard>
        ))}
      </div>
    </div>
  );
}
