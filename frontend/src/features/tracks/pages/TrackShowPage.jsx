import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchTrackAsync,
  removeCurrentTrack,
  selectCurrentTrack,
  selectUserTracks,
} from "../store";

import { ImUsers, ImUserPlus } from "react-icons/im";
import { BsSoundwave } from "react-icons/bs";
import { EditTrackModal } from "../../profiles/components/EditTrackModal";
import { FullSpinner } from "../../../components/FullSpinner";
import { TrackActions } from "../components/TrackActions";
import { fetchPlaylistsAsync } from "../../playlists/store";
import "./TrackShowPage.css";

import {
  ShowLayout,
  ShowAside,
  Banner,
  BannerImage,
  ShowMain,
  ShowActions,
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
import { MdOutlineLibraryMusic } from "react-icons/md";
import { TrackAside } from "../components/TrackAside";

export function TrackShowPage() {
  const dispatch = useDispatch();
  const { user, trackSlug } = useParams();
  const track = useSelector(selectCurrentTrack);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchTrackAsync(user, trackSlug));

    return () => {
      dispatch(removeCurrentTrack());
    };
  }, [dispatch, user, trackSlug]);

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

  // TODO:
  // useEffect(() => {
  //   dispatch(fetchPlaylistsAsync());
  // }, [dispatch]);

  if (!track) {
    return <FullSpinner />;
  }

  return (
    <>
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
                  <BadgeLink to="/discover" label={track.genre} />
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
          <ShowActions />
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

      {editModalOpen ? (
        <EditTrackModal
          track={track}
          onClose={() => setEditModalOpen(false)}
          onSuccess={() => {
            setEditModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

/* <div className="full-page">
<main className="page-container">
  <PlayBanner track={track} />

  <div className={styles.commentContainer}>
    <div className={styles.commentInputContainer}>
      <div className={styles.avatar}>
        <img
          src={
            track?.uploader.photo ??
            "https://soundkloud-seeds.s3.amazonaws.com/default-profile.jpg"
          }
          alt="Profile Avatar"
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.input}>
        <form onSubmit={handleReplyToTrack}>
          <input
            type="text"
            placeholder="Write a comment"
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
          />
        </form>
      </div>
    </div>

    <div className={styles.asideContainer}>
      {/* <div>Related Tracks</div>
      <div>TRACK!</div> 
    </div>

    <TrackActions
      onEditModalOpen={() => setEditModalOpen(true)}
      track={track}
    />
  </div>
  <div className={styles.detailsContainer}>
    <div className={styles.detailsInner}>
      <div style={{ marginRight: "26px" }}>
        <div style={{ width: "15%" }}>
          <img
            src={track.uploader?.photo}
            alt="Profile Avatar"
            height={120}
            width={120}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              objectPosition: "center",
            }}
          />
        </div>
        <p className={styles.uploader}>{track.uploader.displayName}</p>
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
      <div
        style={{
          width: "85%",
          alignSelf: "flex-start",
          paddingTop: "0px",
        }}
      >
        <div>
          <p className={styles.descriptionContent}>
            {track.description}
          </p>
        </div>
        <div>
          <p className={styles.detailsTitle}>Released by:</p>
          <p className={styles.detailsSubTitle}>Napalm Records</p>
        </div>
        <div>
          <p className={styles.detailsTitle}>Release date:</p>
          <p className={styles.detailsSubTitle}>21 October 2022</p>
        </div>
      </div>
    </div>
  </div>
  <div className={styles.commentFeed}>
    <div className={styles.innerCommentFeed}>
      <div
        style={{
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: "80px",
        }}
      >
        <div className={styles.commentFeedHeader}>
          <FaCommentAlt /> {track?.replies?.length}{" "}
          {track?.replies?.length > 1 || track?.replies?.length === 0
            ? "comments"
            : "comment"}
        </div>
        <div className={styles.commentList}>
          {track?.replies?.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  </div>
</main>
</div> */
