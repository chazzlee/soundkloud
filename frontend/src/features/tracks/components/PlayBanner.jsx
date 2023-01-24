import styles from "./PlayBanner.module.css";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { BiLockAlt } from "react-icons/bi";
import { Wavesurfer } from "./Wavesurfer";
import { getRandomRGB } from "../../../utils/getRandomRGB";
import {
  PLAYER_STATUS,
  WAVE_PLAYER,
  selectPlayerStatus,
  trackPlaying,
  trackPaused,
} from "../../player/store";
import { ButtonSpinner } from "../../../components/ButtonSpinner";

const MAX_LENGTH = 49;
const headerFontSize = (track, length = MAX_LENGTH) =>
  track.artist.length + track.title.length >= length ? "20px" : "22px";

export function PlayBanner({ track }) {
  const dispatch = useDispatch();
  const rgbBackground = useRef(getRandomRGB());
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

  return (
    <div
      className={styles.bannerPlayerContainer}
      style={{
        background: `linear-gradient(135deg, ${rgbBackground.current} 0%, rgb(11, 10, 10) 100%)`,
      }}
    >
      <div className={styles.bannerHeader}>
        <ControlButton
          onPlay={() => handlePlay(track.id)}
          onPause={handlePause}
          status={waveStatus}
          loaded={loaded}
        />
        <BannerHeader track={track} />

        <div className={styles.wavesurferContainer}>
          <Wavesurfer track={track} ref={wavesurfer} onLoaded={handleLoaded} />
        </div>
      </div>

      <CoverImage coverUrl={track.cover} />
    </div>
  );
}

function BannerHeader({ track }) {
  return (
    <div className={styles.heading}>
      <div>
        <h1
          className={styles.title}
          style={{ fontSize: headerFontSize(track) }}
        >
          {track.artist} - {track.title}
        </h1>
        <div className={styles.subTitleContainer}>
          <h2>
            <Link to={`/${track.uploader.slug}`} className={styles.subTitle}>
              {track.uploader.displayName}
            </Link>
          </h2>
          {track.private && (
            <p className={`${styles.subTitle} ${styles.privateBadge}`}>
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
        <Link to={"/discover"}>
          <p className={styles.tag}>
            <span style={{ marginRight: "4px" }}>#</span>
            {track.genre}
          </p>
        </Link>
      </div>
    </div>
  );
}

const ControlButton = ({ loaded, status, onPlay, onPause }) => {
  if (!loaded) {
    return (
      <div style={{ paddingRight: 18 }}>
        <ButtonSpinner />
      </div>
    );
  }

  return (
    <div className="control-button">
      {(status === PLAYER_STATUS.PAUSED || status === PLAYER_STATUS.LOADED) && (
        <PlayButton onPlay={onPlay} />
      )}
      {status === PLAYER_STATUS.PLAYING && <PauseButton onPause={onPause} />}
    </div>
  );
};

function PlayButton({ onPlay }) {
  return (
    <button title="Play" className={styles.circularPlayBtn} onClick={onPlay}>
      <IoMdPlay className={styles.playIcon} />
    </button>
  );
}

function PauseButton({ onPause }) {
  return (
    <button title="Pause" className={styles.circularPlayBtn} onClick={onPause}>
      <IoMdPause className={styles.pauseIcon} />
    </button>
  );
}

function CoverImage({ coverUrl }) {
  return (
    <div className={styles.coverImage}>
      <img
        src={coverUrl}
        style={{ objectFit: "cover" }}
        alt="cover"
        height="100%"
        width="100%"
      />
    </div>
  );
}

/* {!!track.tags?.length ? (
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
        )} */
