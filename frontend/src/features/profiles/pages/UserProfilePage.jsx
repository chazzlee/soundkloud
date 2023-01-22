import styles from "./UserProfilePage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { fetchPlaylistsAsync, selectPlaylists } from "../../playlists/store";
import { TrackCard } from "../components/TrackCard";
import {
  fetchAllTracksByUserAsync,
  selectHasTracksLoaded,
  selectUserTracks,
} from "../../tracks/store";
import { EditProfileModal } from "../components/EditProfileModal";
// import { PlaylistList } from "../../playlists/components/PlaylistList";

export function UserProfilePage() {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const tracksLoaded = useSelector(selectHasTracksLoaded);
  const uploadedTracks = useSelector(selectUserTracks);
  const playlists = useSelector(selectPlaylists);

  const [activeTab, setActiveTab] = useState("all");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!tracksLoaded) {
      dispatch(fetchAllTracksByUserAsync(currentUser.id));
    }
    dispatch(fetchPlaylistsAsync());
  }, [dispatch, tracksLoaded, currentUser.id]);

  if (!currentUser) {
    return <h1>FORBIDDEN TODO:</h1>;
  }

  return (
    <>
      <div className="full-page">
        <main className="page-container">
          <div className={styles.bannerPlayerContainer}>
            <div className={styles.avatar}>
              <img
                src={currentUser.photo}
                height="100%"
                width="100%"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt={currentUser.displayName}
              />
            </div>
            <div>
              <div className={styles.title}>
                <h1 className={styles.displayName}>
                  {currentUser.displayName}
                </h1>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className={styles.updateBtn}
                >
                  Update profile
                </button>
              </div>
              <h2 className={styles.subtitle}>{currentUser.email}</h2>
              <h2 className={styles.subtitle}>
                {currentUser.location || "United States"}
              </h2>
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
              {/* <li
                className={`${activeTab === "playlists" ? styles.active : ""}`}
                onClick={() => setActiveTab("playlists")}
                style={{ visibility: "hidden" }}
              >
                Playlists
              </li> */}
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
                {/* <h3 className={styles.uploadedTitle}>Playlists</h3>
                <div className={styles.trackCards}>
                  {playlists?.map((playlist) => (
                    <div key={playlist.id}>
                      <h3>{playlist.title}</h3>
                      <ul>
                        {playlist.tracks.map((track) => (
                          <li key={track.id}>{track.title}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div> */}
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
            {/* {activeTab === "playlists" && (
              <PlaylistList playlists={playlists} />
            )} */}
            <aside>
              <div></div>
            </aside>
          </div>
        </main>
      </div>
      {isProfileModalOpen && (
        <EditProfileModal
          currentUser={currentUser}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </>
  );
}
