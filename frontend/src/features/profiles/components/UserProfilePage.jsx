import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import styles from "./UserProfilePage.module.css";
import { TrackCard } from "./TrackCard";
import { useEffect } from "react";
import {
  fetchAllTracksByUserAsync,
  selectUserTracks,
} from "../../tracks/store";

export function UserProfilePage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const uploadedTracks = useSelector(selectUserTracks);

  useEffect(() => {
    dispatch(fetchAllTracksByUserAsync(currentUser.id));
  }, [dispatch, currentUser.id]);

  if (!currentUser) {
    return <h1>FORBIDDEN TODO:</h1>;
  }

  return (
    <div className="full-page">
      <main className="page-container">
        <div className={styles.bannerPlayerContainer}>
          <div className={styles.avatar}>
            <img
              src={
                currentUser.photo ??
                "https://soundkloud-seeds.s3.amazonaws.com/default-profile.jpg"
              }
              height="100%"
              width="100%"
              style={{ borderRadius: "50%" }}
              alt={currentUser.displayName}
            />
          </div>
          <div>
            <div className={styles.title}>
              <h1 className={styles.displayName}>{currentUser.displayName}</h1>
              <button>Upload header image</button>
            </div>
            <h2 className={styles.subtitle}>Chazz Lee</h2>
            <h2 className={styles.subtitle}>United States</h2>
          </div>
        </div>
        <div className={styles.tabsBar}>
          <div className={styles.left}>
            <li className={styles.active}>All</li>
            <li>Tracks</li>
            <li>Playlists</li>
          </div>
        </div>
        <div className={styles.container}>
          <div>
            <h3 className={styles.uploadedTitle}>Uploaded Tracks</h3>
            <div className={styles.trackCards}>
              {uploadedTracks?.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
          <aside>ASIDE</aside>
        </div>
      </main>
    </div>
  );
}
