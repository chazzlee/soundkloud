import styles from "./TrackShowPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchTrackAsync,
  removeCurrentTrack,
  replyToTrackAsync,
  selectCurrentTrack,
} from "../store";
import { FaCommentAlt } from "react-icons/fa";
import { ImUsers, ImUserPlus } from "react-icons/im";
import { BsSoundwave } from "react-icons/bs";
import { EditTrackModal } from "../../profiles/components/EditTrackModal";
import { FullSpinner } from "../../../components/FullSpinner";
import { PlayBanner } from "../components/PlayBanner";
import { TrackActions } from "../components/TrackActions";
import { fetchPlaylistsAsync } from "../../playlists/store";
import { ReplyCard } from "../components/ReplyCard";

export function TrackShowPage() {
  const dispatch = useDispatch();
  const { user, trackSlug } = useParams();
  const track = useSelector(selectCurrentTrack);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchTrackAsync(user, trackSlug));
  }, [dispatch, user, trackSlug]);

  const [replyBody, setReplyBody] = useState("");

  const handleReplyToTrack = (e) => {
    e.preventDefault();
    const reply = { body: replyBody };
    dispatch(replyToTrackAsync(trackSlug, reply));
    setReplyBody("");
  };

  const [following, setFollowing] = useState(false);
  const handleFollow = () => {
    setFollowing((prev) => !prev);
  };

  // TODO:
  // useEffect(() => {
  //   dispatch(fetchPlaylistsAsync());
  // }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(removeCurrentTrack());
    };
  }, [dispatch]);

  if (!track) {
    return <FullSpinner />;
  }

  return (
    <>
      <div className="full-page">
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
              <div>TRACK!</div> */}
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
                    src={
                      track.uploader?.photo ??
                      "https://heavymag.com.au/wp-content/uploads/2022/12/image003-3-e1670485565713.jpg"
                    }
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
      </div>
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
