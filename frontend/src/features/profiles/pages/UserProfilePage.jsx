import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { fetchPlaylistsAsync, selectPlaylists } from "../../playlists/store";
import styles from "./UserProfilePage.module.css";
import { TrackCard } from "../components/TrackCard";
import { useEffect, useState } from "react";
import {
  fetchAllTracksByUserAsync,
  selectUserTracks,
} from "../../tracks/store";

export function UserProfilePage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const uploadedTracks = useSelector(selectUserTracks);
  const [activeTab, setActiveTab] = useState("all");
  const playlists = useSelector(selectPlaylists);

  useEffect(() => {
    dispatch(fetchAllTracksByUserAsync(currentUser.id));
    dispatch(fetchPlaylistsAsync());
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
                "https://i1.sndcdn.com/avatars-000007873027-acd5vm-t200x200.jpg"
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
              {/* <button>Upload header image</button> */}
            </div>
            <h2 className={styles.subtitle}>Chazz Lee</h2>
            <h2 className={styles.subtitle}>United States</h2>
          </div>
        </div>
        <div className={styles.tabsBar}>
          <div className={styles.left}>
            <li
              className={`${activeTab === "all" ? styles.active : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </li>
            <li
              className={`${activeTab === "tracks" ? styles.active : ""}`}
              onClick={() => setActiveTab("tracks")}
            >
              Tracks
            </li>
            <li
              className={`${activeTab === "playlists" ? styles.active : ""}`}
              onClick={() => setActiveTab("playlists")}
            >
              Playlists
            </li>
          </div>
        </div>
        <div className={styles.container}>
          {activeTab === "all" && (
            <div>
              <h3 className={styles.uploadedTitle}>Uploaded Tracks</h3>
              <div className={styles.trackCards}>
                {uploadedTracks?.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
              <h3 className={styles.uploadedTitle}>Playlists</h3>
              <div className={styles.trackCards}>
                {playlists?.map((playlist) => (
                  <div key={playlist.id}>playlist</div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "tracks" && (
            <div>
              <h3 className={styles.uploadedTitle}>Uploaded Tracks</h3>
              <div className={styles.trackCards}>
                {uploadedTracks?.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            </div>
          )}
          {activeTab === "playlists" && (
            <div>
              <h3 className={styles.uploadedTitle}>Playlists</h3>
              <div className={styles.trackCards}>
                {playlists?.map((playlist) => (
                  <div key={playlist.id}>{playlist.title}</div>
                ))}
              </div>
            </div>
          )}
          <aside>
            <div></div>
          </aside>
        </div>
      </main>
    </div>
  );
}
