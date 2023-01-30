import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store";
import { fetchAllTracksByUserAsync } from "../../tracks/store";
import { fetchPlaylistsAsync } from "../../playlists/store";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
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
import { useState } from "react";
import { useCallback } from "react";
import { ProfilesApi } from "../../../api/profiles";
import {
  fetchProfilesAsync,
  headerCoverUpdatedSuccess,
  selectProfileBySlug,
  selectProfilesLoaded,
} from "../store";

export function UserProfilePage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const { slug } = useParams();
  const user = useSelector((state) => selectProfileBySlug(state, slug));
  const isOwner = currentUser?.id === user?.id;
  const [headerCover] = useState("");

  const profilesLoaded = useSelector(selectProfilesLoaded);

  const isRoot =
    !location.pathname.includes("tracks") &&
    !location.pathname.includes("sets");

  const handleUpdateHeaderCover = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.set("header_image", file, file.name);

      const response = await ProfilesApi.updateHeaderCover(user.id, formData);
      if (response.ok) {
        const data = await response.json();
        dispatch(headerCoverUpdatedSuccess(data.user));
      }
    },
    [dispatch, user?.id]
  );

  useEffect(() => {
    if (!profilesLoaded) {
      dispatch(fetchProfilesAsync());
    }

    if (user?.id) {
      dispatch(fetchAllTracksByUserAsync(user?.id));
      dispatch(fetchPlaylistsAsync(user?.id));
    }
  }, [dispatch, profilesLoaded, user?.id]);

  if (!user) {
    return (
      // TODO:
      <div className="show-main-section">
        <h2>Nothing here</h2>
      </div>
    );
  }

  return (
    <>
      <ShowLayout>
        <Banner
          height={260}
          headerUrl={user.headerCover}
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
                {isOwner && (
                  <div className="banner-details remove-margin-right">
                    <label
                      htmlFor="headerCover"
                      role="button"
                      aria-label="Update header image"
                      className="cover-trigger update-profile-btn"
                    >
                      <input
                        type="file"
                        id="headerCover"
                        name="headerCover"
                        accept="image/*"
                        value={headerCover}
                        onChange={handleUpdateHeaderCover}
                      />
                      <MdCameraAlt />
                      Update header image
                    </label>
                  </div>
                )}
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
              {isOwner && <EditProfile triggerSize="lg" profile={user} />}
            </div>
          </div>
          <div className="user-main-container">
            <Outlet />
          </div>
        </ShowMain>
      </ShowLayout>
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
