import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPlay } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import {
  fetchTrackAsync,
  replyToTrackAsync,
  selectCurrentTrack,
} from "../store";
import { selectCurrentUser } from "../../auth/store";
import styles from "./TrackShowPage.module.css";
import { formatDistanceToNow } from "date-fns";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaPlay, FaCommentAlt } from "react-icons/fa";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { IoLinkOutline } from "react-icons/io5";
import { TfiMoreAlt } from "react-icons/tfi";
import { SlPencil } from "react-icons/sl";
import { ImUsers, ImUserPlus } from "react-icons/im";
import { BsSoundwave } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import { Spinner } from "../../../components/Spinner";
import { BiLockAlt } from "react-icons/bi";
const MAX_LENGTH = 49;

export function TrackShowPage() {
  const dispatch = useDispatch();
  const { user, trackSlug } = useParams();
  const track = useSelector(selectCurrentTrack);

  const currentUser = useSelector(selectCurrentUser);
  const isUploader = track && track?.uploader.id === currentUser?.id;

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const headerFontSize = (track, length = MAX_LENGTH) =>
    track?.artist.length + track?.title.length >= length ? "20px" : "22px";

  useEffect(() => {
    dispatch(fetchTrackAsync(user, trackSlug));
  }, [dispatch, user, trackSlug]);

  useEffect(() => {
    if (track && !wavesurfer.current && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#eee",
        progressColor: "#f50",
        cursorColor: "transparent",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 100,
      });
      wavesurfer.current.load(
        "https://cors-anywhere.herokuapp.com/https://download.samplelib.com/mp3/sample-15s.mp3"
      );
    }
  }, [track]);

  // TODO:
  const [isPlaying, setIsPlaying] = useState(false);

  const [replyBody, setReplyBody] = useState("");

  const handleReplyToTrack = (e) => {
    e.preventDefault();
    const reply = { body: replyBody };
    dispatch(replyToTrackAsync(trackSlug, reply));
    setReplyBody("");
  };

  if (!track) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className="full-page">
      <main className="page-container">
        <div className={styles.bannerPlayerContainer}>
          <div className={styles.bannerHeader}>
            <div>
              {!isPlaying ? (
                <button
                  title="Play"
                  className={styles.circularPlayBtn}
                  onClick={() => {
                    wavesurfer.current?.play();
                    setIsPlaying(true);
                  }}
                >
                  <IoMdPlay
                    style={{
                      fontSize: "30px",
                      color: "white",
                      verticalAlign: "middle",
                      marginLeft: "6px",
                    }}
                  />
                </button>
              ) : (
                <button
                  title="Pause"
                  className={styles.circularPlayBtn}
                  onClick={() => {
                    wavesurfer.current?.pause();
                    setIsPlaying(false);
                  }}
                >
                  <IoMdPause
                    style={{
                      fontSize: "30px",
                      color: "white",
                      verticalAlign: "middle",
                    }}
                  />
                </button>
              )}
            </div>

            <div className={styles.heading}>
              <div>
                <h1
                  className={styles.title}
                  style={{ fontSize: headerFontSize(track) }}
                >
                  {track.artist} - {track.title}
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 className={styles.subTitle}>
                    {track.uploader.displayName}
                  </h2>
                  {track.private && (
                    <p
                      className={styles.subTitle}
                      style={{
                        backgroundColor: "var(--primary-orange)",
                        color: "#fff",
                        borderRadius: "12px",
                        border: "1px solid var(--primary-orange)",
                      }}
                    >
                      <span>
                        <BiLockAlt style={{ verticalAlign: "middle" }} />
                      </span>{" "}
                      private
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.infoRight}>
                <p className={styles.postedAt}>
                  {formatDistanceToNow(new Date(track.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                {!!track.tags?.length ? (
                  <Link to={"/discover"}>
                    <p className={styles.tag}>
                      <span style={{ marginRight: "4px" }}>#</span>
                      {track.tags[0].label}
                    </p>
                  </Link>
                ) : (
                  <Link to={"/discover"}>
                    <p className={styles.tag}>
                      <span style={{ marginRight: "4px" }}>#</span>
                      {track.genre}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            <div
              style={{
                color: "white",
                position: "absolute",
                bottom: 24,
                maxWidth: "813px",
                width: "100%",
                height: "100px",
                backgroundColor: "transparent",
                zIndex: 1,
              }}
            >
              <div id="waveform" ref={waveformRef} />
            </div>
          </div>

          <div className={styles.coverImage}>
            <img
              src={
                track.cover ??
                "https://heavymag.com.au/wp-content/uploads/2022/12/image003-3-e1670485565713.jpg"
              }
              style={{ objectFit: "cover" }}
              alt="cover"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className={styles.commentContainer}>
          <div className={styles.commentInputContainer}>
            <div className={styles.avatar}>
              <img
                src={
                  track?.uploader.photo ??
                  "https://soundkloud-seeds.s3.amazonaws.com/default-profile.jpg"
                }
                alt="Profile Avatar"
                height="40px"
                width="40px"
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
            <div>Related Tracks</div>
            <div>TRACK!</div>
          </div>

          <div className={styles.actionsRow}>
            <div className={styles.actions}>
              {isUploader ? (
                <>
                  <button>Share</button>
                  <button>
                    <div>
                      <IoLinkOutline style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>Copy Link</div>
                  </button>
                  <button>
                    <div>
                      <SlPencil style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>Edit</div>
                  </button>
                  <button>Distribute</button>
                  <button>
                    <div>
                      <TfiMoreAlt style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>More</div>
                  </button>
                </>
              ) : (
                <>
                  <button>
                    <div>
                      <AiOutlineHeart style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>Like</div>
                  </button>
                  <button>
                    <div>
                      <BiRepost
                        style={{ verticalAlign: "middle", fontSize: "1.1rem" }}
                      />
                    </div>
                    <div>Repost</div>
                  </button>
                  <button>
                    <div>
                      <RiShareForwardBoxLine
                        style={{ verticalAlign: "middle", fontSize: ".9rem" }}
                      />
                    </div>
                    <div>Share</div>
                  </button>
                  <button>
                    <div>
                      <IoLinkOutline style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>Copy Link</div>
                  </button>
                  <button>
                    <div>
                      <TfiMoreAlt style={{ verticalAlign: "middle" }} />
                    </div>
                    <div>More</div>
                  </button>
                </>
              )}
            </div>
            <div className={styles.insights}>
              <div style={{ marginRight: "8px" }}>
                <FaPlay
                  fontSize={10}
                  style={{ marginRight: "4px", verticalAlign: "sub" }}
                />
                <div>43</div>
              </div>
              <div>
                <AiFillHeart
                  style={{ marginRight: "4px", verticalAlign: "sub" }}
                />
                <div>4390</div>
              </div>
            </div>
          </div>
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
              <div style={{ textAlign: "center", paddingTop: "2px" }}>
                <button className={styles.followBtn}>
                  <ImUserPlus style={{ verticalAlign: "middle" }} /> Follow
                </button>
              </div>
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
                  {track.description
                    ? track.description
                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repudiandae natus eum impedit nostrum expedita? Rem in asperiores labore excepturi dicta molestiae recusandae, Lorem ipsum dolor sit amet."}
                </p>
              </div>
              <div>
                <p className={styles.detailsTitle}>Released by:</p>
                <p className={styles.detailsSubTitle}>Napalm Records</p>
              </div>
              <div>
                <p className={styles.detailsTitle}>Release date:</p>
                <p className={styles.detailsSubTitle}>21 October 2021</p>
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
                <FaCommentAlt /> {track?.replies.length}{" "}
                {track?.replies.length > 1 || track?.replies.length === 0
                  ? "comments"
                  : "comment"}
              </div>
              <div className={styles.commentList}>
                {track?.replies.map((reply) => (
                  <div key={reply.id} className={styles.commentCard}>
                    <div style={{ marginRight: "10px" }}>
                      <img
                        src={
                          reply.user.photo ??
                          "https://soundkloud-seeds.s3.amazonaws.com/default-profile.jpg"
                        }
                        alt="Profile Avatar"
                        height="40px"
                        width="40px"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <div className={styles.commenter}>
                        <p>
                          {reply.user.displayName} <span>at </span>
                          <span>
                            {new Date(reply.createdAt).toLocaleTimeString(
                              "en-US",
                              { timeStyle: "short" }
                            )}
                          </span>
                        </p>
                        <p>
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className={styles.commentContent}>{reply.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
