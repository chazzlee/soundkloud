import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchTrackAsync,
  removeCurrentTrack,
  selectCurrentTrack,
  // selectUserTracks,
} from "../store";

// import { ImUsers, ImUserPlus } from "react-icons/im";
// import { BsSoundwave } from "react-icons/bs";
import { FullSpinner } from "../../../components/FullSpinner";
import "./TrackShowPage.css";

import {
  ShowLayout,
  Banner,
  BannerImage,
  ShowMain,
  GridContainer,
} from "../../../components/Layouts/ShowLayout";
import { ControlButton } from "../../../components/ControlButton";
import {
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  WAVE_PLAYER,
} from "../../player/store";
import { Wavesurfer } from "../components/Wavesurfer";
import { PrivateBadge } from "../../../components/PrivateBadge";
import { BadgeLink } from "../../../components/BadgeLink";
import { TimeAgo } from "../../../components/TimeAgo";
import { UploaderAvatar } from "../../../components/UploaderAvatar";
import { CommentForm } from "../../replies/components/CommentForm";
import { TrackDetails } from "../components/TrackDetails";
import { CommentFeed } from "../../replies/components/CommentFeed";
import { BannerTitleHeading } from "../../../components/Layouts/ShowLayout/Banner";
import { TrackAside } from "../components/TrackAside";
import { ItemActionGroup } from "../../../components/ItemActionGoup";
import {
  selectGenreLabelById,
  selectGenresLoaded,
} from "../../genres/store/selectors";
import { fetchGenresAsync } from "../../genres/store";
import {
  fetchPlaylistsAsync,
  selectPlaylistsLoaded,
} from "../../playlists/store";

// TODO: load genres if not loaded
export function TrackShowPage() {
  const dispatch = useDispatch();
  const { user, trackSlug } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const track = useSelector(selectCurrentTrack);

  const genresLoaded = useSelector(selectGenresLoaded);
  const genreLabel = useSelector((state) =>
    selectGenreLabelById(state, track?.genre)
  );
  useEffect(() => {
    dispatch(fetchTrackAsync(user, trackSlug));
    if (!genresLoaded) {
      dispatch(fetchGenresAsync());
    }

    return () => {
      dispatch(removeCurrentTrack());
    };
  }, [dispatch, user, trackSlug, genresLoaded]);

  const [loaded, setLoaded] = useState(false);

  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );
  const wavesurfer = useRef(null);

  const handlePlay = useCallback(
    (trackId) => {
      wavesurfer.current.play();
      dispatch(trackPlaying(trackId));
    },
    [dispatch]
  );

  const handlePause = useCallback(() => {
    wavesurfer.current.pause();
    dispatch(trackPaused());
  }, [dispatch]);

  const handleLoaded = useCallback((loaded) => {
    setLoaded(loaded);
  }, []);

  if (!track) {
    return <FullSpinner />;
  }

  return (
    <ShowLayout>
      <Banner
        header={
          <>
            <ControlButton
              status={waveStatus}
              loaded={loaded}
              onPlay={() => handlePlay(track.id)}
              onPause={handlePause}
            />
            <div className="banner-heading">
              <div className="banner-title">
                <BannerTitleHeading
                  title={`${track.artist} - ${track.title}`}
                />
                <h3 className="subtitle">
                  <Link to={`/${track.uploader.slug}`}>
                    {track.uploader.displayName}
                  </Link>
                </h3>
              </div>
              <div className="banner-details">
                <TimeAgo date={track.createdAt} />
                <BadgeLink to="/discover" label={genreLabel} />
                <PrivateBadge privacy={track.privacy} />
              </div>
            </div>
            <BannerImage imageUrl={track.cover} />
          </>
        }
      >
        <Wavesurfer track={track} ref={wavesurfer} onLoaded={handleLoaded} />
      </Banner>

      <ShowMain
        aside={
          <TrackAside
            user={{ id: track.uploader.id, slug: track.uploader.slug }}
          />
        }
      >
        <CommentForm avatar={currentUser.photo} trackId={track.id} />
        <ItemActionGroup type="track" item={track} />
        <GridContainer>
          <UploaderAvatar
            photo={track.uploader.photo}
            slug={track.uploader.slug}
            displayName={track.uploader.displayName}
          />
          <TrackDetails description={track.description} />
          <CommentFeed comments={track.replies} />
        </GridContainer>
      </ShowMain>
    </ShowLayout>
  );
}

/* 
  <div className={styles.detailsContainer}>
  <div
    style={{
      paddingTop: "2px",
      paddingBottom: "6px",
      textAlign: "center",
    }}
  >
    <span
      style={{
        color: "#999",
        fontSize: "11px",
        marginRight: "8px",
      }}
    >
      <ImUsers
        fill={"#999"}
        fontSize={14}
        style={{ verticalAlign: "middle", marginRight: "2px" }}
      />
      106
    </span>
    <span style={{ color: "#999", fontSize: "11px" }}>
      <BsSoundwave
        fill={"#999"}
        fontSize={14}
        style={{ verticalAlign: "middle", marginRight: "2px" }}
      />
      43
    </span>
  </div>
  {currentUser.id !== track.uploader.id ? (
    <div
      style={{ textAlign: "center", paddingTop: "2px" }}
      onClick={handleFollow}
    >
      <button className={styles.followBtn}>
        <ImUserPlus style={{ verticalAlign: "middle" }} />{" "}
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  ) : null}
</div>
</div>
</main>
</div> */
