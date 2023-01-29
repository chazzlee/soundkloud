// import styles from "./UserProfilePage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
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
              <ProfileBannerAvatar photoUrl={user.photo} />
              <div className="banner-heading">
                <div className="banner-title extend-padding-left">
                  <BannerTitleHeading title={user.displayName} />
                  <h3 className="subtitle">{user.email}</h3>
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
        <ShowMain aside={<UserProfileAside />}>
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
                className="item-action-btn"
                aria-label="Edit profile"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <ImProfile />
                <span>Edit profile</span>
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

// TODO:
function ProfileBannerAvatar({ photoUrl }) {
  return photoUrl ? (
    <img
      className="profile-avatar-large"
      src={photoUrl}
      alt="Profile banner avatar"
    />
  ) : (
    <div
      className="profile-avatar-large"
      style={{ backgroundColor: "black" }}
    />
  );
}

function UserProfileAside() {
  return (
    <aside
      className="aside-root-container"
      style={{
        marginTop: 48.69,
        borderTop: "1px solid #f2f2f2",
        paddingTop: 12,
      }}
    >
      <div
        className="profile-aside-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div
          className="insight-box"
          style={{ borderRight: "1px solid #f2f2f2", paddingRight: 40 }}
        >
          <h3
            style={{
              fontSize: 13,
              color: "#999",
              fontWeight: 400,
              paddingBottom: 2,
            }}
            className="insight-heading"
          >
            Followers
          </h3>
          <p style={{ color: "#999", fontSize: 20 }} className="insight-stat">
            35
          </p>
        </div>
        <div
          className="insight-box"
          style={{ borderRight: "1px solid #f2f2f2", paddingRight: 40 }}
        >
          <h3
            style={{
              fontSize: 13,
              color: "#999",
              fontWeight: 400,
              paddingBottom: 2,
            }}
            className="insight-heading"
          >
            Following
          </h3>
          <p className="insight-stat" style={{ color: "#999", fontSize: 20 }}>
            35
          </p>
        </div>
        <div className="insight-box">
          <h3
            style={{
              fontSize: 13,
              color: "#999",
              fontWeight: 400,
              paddingBottom: 2,
            }}
            className="insight-heading"
          >
            Tracks
          </h3>
          <p className="insight-stat" style={{ color: "#999", fontSize: 20 }}>
            9
          </p>
        </div>
      </div>
    </aside>
  );
}
