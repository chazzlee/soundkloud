import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchAllTracksByUserAsync,
  selectHasTracksLoaded,
  selectUserTracks,
} from "../../tracks/store";
// import { EditProfileModal } from "../components/EditProfileModal";
// import { PlaylistList } from "../../playlists/components/PlaylistList";
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
import { MdCameraAlt } from "react-icons/md";
import { UserProfileAside } from "../components/UserProfileAside";
import { EditProfile } from "../components/EditProfile/EditProfile";

export function UserProfilePage() {
  const dispatch = useDispatch();

  // TODO: find user by id/slug instead of current user
  const user = useSelector(selectCurrentUser);

  const tracksLoaded = useSelector(selectHasTracksLoaded);
  const playlistsLoaded = useSelector(selectPlaylistsLoaded);

  // const uploadedTracks = useSelector(selectUserTracks);
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const playlists = useSelector(selectPlaylists);

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
              <div className="banner-heading remove-margin-right">
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
                    onClick={() => console.log("TODO")}
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
              <EditProfile triggerSize="lg" profile={user} />
            </div>
          </div>
          <div className="user-main-container">
            <Outlet />
          </div>
        </ShowMain>
      </ShowLayout>

      {/* TODO:FIXME: auth check?
      {isProfileModalOpen && (
        <EditProfileModal
          currentUser={user}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )} */}
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
