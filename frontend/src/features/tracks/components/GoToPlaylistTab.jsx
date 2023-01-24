import styles from "./PlaylistModal.module.css";
import { Link } from "react-router-dom";
import { TrackRow } from "./TrackRow";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";

export function GoToPlaylistTab({ trackToAdd, playlistSlug }) {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
      <div className={styles.savedContainer}>
        <div className={styles.coverContainer} />
        {/* TODO: */}
        <Link
          className={styles.goBtn}
          to={`/${currentUser.slug}/sets/${playlistSlug}`}
        >
          Go to playlist
        </Link>
      </div>
      <div className={styles.tracks}>
        <TrackRow
          track={trackToAdd}
          style={{ color: "#444", fontWeight: 400 }}
        />
      </div>
    </div>
  );
}
