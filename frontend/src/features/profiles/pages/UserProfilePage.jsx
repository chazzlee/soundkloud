import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { fetchPlaylistsAsync, selectPlaylists } from "../../playlists/store";
import styles from "./UserProfilePage.module.css";
import { TrackCard } from "../components/TrackCard";
import { useEffect, useState } from "react";
import {
  fetchAllTracksByUserAsync,
  selectHasTracksLoaded,
  selectUserTracks,
} from "../../tracks/store";
import { Modal } from "../../../context/Modal";
import slug from "slug";
import { csrfFetch } from "../../../api/csrfFetch";

export function UserProfilePage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const tracksLoaded = useSelector(selectHasTracksLoaded);
  const uploadedTracks = useSelector(selectUserTracks);
  const [activeTab, setActiveTab] = useState("all");
  const playlists = useSelector(selectPlaylists);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName,
    age: currentUser?.age,
    gender: currentUser?.gender,
    location: currentUser?.location || "",
  });

  const handleChange = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...currentUser,
      ...profileData,
      age: parseInt(profileData.age, 10),
      slug: slug(profileData.displayName),
    };

    // TODO: move into redux-thunk
    const response = await csrfFetch(`/api/profiles/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    });
    console.log(await response.json());
  };

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
                <h1 className={styles.displayName}>
                  {currentUser.displayName}
                </h1>
                {/* <button>Upload header image</button> */}
              </div>
              <h2 className={styles.subtitle}>Chazz Lee</h2>
              <h2 className={styles.subtitle}>United States</h2>
            </div>
            <div>
              <button onClick={() => setIsProfileModalOpen(true)}>
                Update Profile
              </button>
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
                    <div key={playlist.id}>
                      <h3>{playlist.title}</h3>
                      <ul>
                        {playlist.tracks.map((track) => (
                          <li key={track.id}>{track.title}</li>
                        ))}
                      </ul>
                    </div>
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
                    <div key={playlist.id}>
                      <h3>{playlist.title}</h3>
                      <ul>
                        {playlist.tracks.map((track) => (
                          <li key={track.id}>{track.title}</li>
                        ))}
                      </ul>
                    </div>
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
      {isProfileModalOpen && (
        <Modal onClose={() => setIsProfileModalOpen(false)}>
          <div>
            <form onSubmit={handleProfileUpdate}>
              <div>
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleChange}
                  placeholder="Display name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="age"
                  value={profileData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>
              <div>
                <select
                  name="gender"
                  id="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="custom">Custom</option>
                  <option value="none">Prefer not to say</option>
                </select>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                </div>
              </div>
              <div>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

// email: currentUser.email,
// displayName: currentUser.displayName,
// age: currentUser.age,
// gender: currentUser.gender,
// location: currentUser.location || "",
