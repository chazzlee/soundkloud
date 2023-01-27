// import styles from "./UserProfilePage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { TrackCard } from "../components/TrackCard";
import {
  fetchAllTracksByUserAsync,
  selectHasTracksLoaded,
  selectUserTracks,
} from "../../tracks/store";
import { EditProfileModal } from "../components/EditProfileModal";
import { PlaylistList } from "../../playlists/components/PlaylistList";
import {
  fetchPlaylistsAsync,
  selectPlaylists,
  selectPlaylistsLoaded,
} from "../../playlists/store";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Banner,
  BannerImage,
  ShowLayout,
  ShowMain,
} from "../../../components/Layouts/ShowLayout";
import "./UserProfilePage.css";
import { BannerTitleHeading } from "../../../components/Layouts/ShowLayout/Banner";
import { ImProfile } from "react-icons/im";
import { MdCameraAlt } from "react-icons/md";

export function UserProfilePage() {
  const dispatch = useDispatch();

  // TODO: find user by id/slug instead of current user
  const user = useSelector(selectCurrentUser);
  const tracksLoaded = useSelector(selectHasTracksLoaded);
  const uploadedTracks = useSelector(selectUserTracks);
  const playlistsLoaded = useSelector(selectPlaylistsLoaded);
  const playlists = useSelector(selectPlaylists);

  const [activeTab, setActiveTab] = useState("all");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const location = useLocation();

  const isRoot =
    !location.pathname.includes("tracks") &&
    !location.pathname.includes("sets");

  useEffect(() => {
    if (!tracksLoaded) {
      dispatch(fetchAllTracksByUserAsync(user.id));
    }
    if (!playlistsLoaded) {
      dispatch(fetchPlaylistsAsync());
    }
  }, [dispatch, tracksLoaded, playlistsLoaded, user.id]);

  if (!user) {
    return <h1>FORBIDDEN TODO:</h1>;
  }

  return (
    <>
      <ShowLayout>
        <Banner
          height={260}
          header={
            <>
              <img
                className="profile-avatar-large"
                src={user.photo}
                alt={user.displayName}
              />
              <div className="banner-heading">
                <div className="banner-title extend-padding-left">
                  <BannerTitleHeading title={user.displayName} />
                  <h3 className="subtitle">REAL NAME</h3>
                  <h3 className="subtitle">
                    {user.location || "United States"}
                  </h3>
                </div>
                <div className="banner-details remove-margin-right">
                  <button
                    className="update-profile-btn"
                    aria-label="Update header image"
                    onClick={() => console.log("TODO: IMPLEMENT")}
                  >
                    <MdCameraAlt /> Update header image
                  </button>
                </div>
              </div>
            </>
          }
        />
        <ShowMain aside={<div style={{ paddingTop: 20 }}>ASIDE TODO:</div>}>
          <div className="tabs-nav">
            <div className="nav-left">
              <Link to="" className={isRoot ? "active" : ""}>
                All
              </Link>
              <NavLink to="tracks">Tracks</NavLink>
              <NavLink to="sets">Playlists</NavLink>
            </div>
            <div className="nav-right">
              <button
                className="show-action-btn"
                aria-label="Edit profile"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <ImProfile />
                <span>Edit</span>
              </button>
            </div>
          </div>
          <div className="user-main-container">
            <Outlet />
          </div>
        </ShowMain>
      </ShowLayout>

      {/* TODO:FIXME: auth check? */}
      {isProfileModalOpen && (
        <EditProfileModal
          currentUser={user}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </>
  );
}

/* {activeTab === "all" && (
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
            )} */

/* {activeTab === "tracks" && (
              <div>
                <h3 className={styles.uploadedTitle}>Uploaded Tracks</h3>
                <div className={styles.trackCards}>
                  {uploadedTracks?.map((track) => (
                    <TrackCard key={track.id} track={track} />
                  ))}
                </div>
              </div>
            )} */

/* {activeTab === "playlists" && (
              <PlaylistList playlists={playlists} />
            )} */

//       <div className="full-page">
//   <main className="page-container">
//     <div className={styles.bannerPlayerContainer}>
//       <div className={styles.avatar}>
//         <img
//           src={currentUser.photo}
//           height="100%"
//           width="100%"
//           style={{ borderRadius: "50%", objectFit: "cover" }}
//           alt={currentUser.displayName}
//         />
//       </div>
//       <div>
//         <div className={styles.title}>
//           <h1 className={styles.displayName}>
//             {currentUser.displayName}
//           </h1>
//           <button
//             onClick={() => setIsProfileModalOpen(true)}
//             className={styles.updateBtn}
//           >
//             Update profile
//           </button>
//         </div>
//         <h2 className={styles.subtitle}>{currentUser.email}</h2>
//         <h2 className={styles.subtitle}>
//           {currentUser.location || "United States"}
//         </h2>
//       </div>
//     </div>
//     <div className={styles.tabsBar}>
//       <div className={styles.left}>
//         <NavLink
//           // className={`${activeTab === "all" ? styles.active : ""}`}
//           // onClick={() => setActiveTab("all")}
//           to=""
//         >
//           All
//         </NavLink>
//         <NavLink
//           // className={`${activeTab === "tracks" ? styles.active : ""}`}
//           // onClick={() => setActiveTab("tracks")}
//           to="tracks"
//         >
//           Tracks
//         </NavLink>
//         <NavLink
//           // className={`${activeTab === "playlists" ? styles.active : ""}`}
//           // onClick={() => setActiveTab("playlists")}
//           to="sets"
//         >
//           Playlists
//         </NavLink>
//       </div>
//     </div>
//     <div className={styles.container}>
//       <Outlet />

//       <aside>
//         <div></div>
//       </aside>
//     </div>
//   </main>
// </div>

// {isProfileModalOpen && (
//   <EditProfileModal
//     currentUser={currentUser}
//     onClose={() => setIsProfileModalOpen(false)}
//   />
// )}
