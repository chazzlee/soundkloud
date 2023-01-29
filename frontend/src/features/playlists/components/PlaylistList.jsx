import styles from "../../profiles/pages/UserProfilePage.module.css";
import { Link } from "react-router-dom";
import { PlaylistTrackList } from "./PlaylistTrackList";

export function PlaylistList({ playlists }) {
  return (
    <div>
      <h3 className={styles.uploadedTitle}>Playlists</h3>
      <div className={styles.trackCards}>
        {playlists?.map((playlist) => (
          <div key={playlist.id}>
            <h3>
              <Link to={playlist.permalink}>{playlist.title}</Link>
            </h3>
            <PlaylistTrackList playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
}
