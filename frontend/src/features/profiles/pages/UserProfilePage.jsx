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
