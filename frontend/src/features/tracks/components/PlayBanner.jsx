import styles from "./PlayBanner.module.css";
import { useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { BiLockAlt } from "react-icons/bi";
import { Wavesurfer } from "./Wavesurfer";
import { getRandomRGB } from "../../../utils/getRandomRGB";
import { getRandomInteger } from "../../../utils/getRandomInteger";
import {
  globalStatusChanged,
  globalTrackCleared,
  globalTrackLoaded,
  PLAYER_STATUS,
  selectGlobalSource,
  selectWaveSource,
  selectWaveStatus,
  waveStatusChanged,
} from "../../player/store";
import { ButtonSpinner } from "../../../components/ButtonSpinner";
import { useCallback } from "react";

const MAX_LENGTH = 49;

const sampleCovers = [
  "https://soundkloud-seeds.s3.amazonaws.com/Blind+Guardian+-+2010+-+At+The+Edge+Of+Time.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/anata-dismay.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Artillery+Terror+Squad--f.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/at-the-gate-redsky.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Control+Denied+-+The+Fragile+Art+of+Existence.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Bolt_Thrower_-_Realm_Of_Chaos-front.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Soulside_Journey-Cover.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/Cryptopsy_-_whisper_supremacy.jpg",
  "https://soundkloud-seeds.s3.amazonaws.com/hate_eternal_king_of_all_kings_2002_retail_cd-front.jpg",
];

const headerFontSize = (track, length = MAX_LENGTH) =>
  track.artist.length + track.title.length >= length ? "20px" : "22px";

export function PlayBanner({ track }) {
  const dispatch = useDispatch();
  const rgbBackground = useRef(getRandomRGB());
  const sampleCoverImage = useRef(
    sampleCovers[getRandomInteger(sampleCovers.length - 1)]
  );

  const waveStatus = useSelector(selectWaveStatus);
  const waveSource = useSelector(selectWaveSource, shallowEqual);
  const globalSource = useSelector(selectGlobalSource, shallowEqual);

  const [loading, setLoading] = useState(true);
  const handleLoading = useCallback((state) => setLoading(state), []);

  return (
    <div
      className={styles.bannerPlayerContainer}
      style={{
        background: `linear-gradient(135deg, ${rgbBackground.current} 0%, rgb(11, 10, 10) 100%)`,
      }}
    >
      <div className={styles.bannerHeader}>
        <div>
          {loading ? (
            <div style={{ paddingRight: 18 }}>
              <ButtonSpinner />
            </div>
          ) : waveStatus !== PLAYER_STATUS.PLAYING ? (
            <button
              title="Play"
              className={styles.circularPlayBtn}
              onClick={() => {
                if (waveSource.sourceId !== globalSource.sourceId) {
                  dispatch(globalTrackCleared());
                  dispatch(
                    globalTrackLoaded({
                      id: waveSource.sourceId,
                      url: waveSource.sourceUrl,
                      duration: waveSource.totalDuration,
                    })
                  );
                }
                dispatch(globalStatusChanged(PLAYER_STATUS.PLAYING));
                dispatch(waveStatusChanged(PLAYER_STATUS.PLAYING));
              }}
            >
              <IoMdPlay className={styles.playIcon} />
            </button>
          ) : (
            <button
              title="Pause"
              className={styles.circularPlayBtn}
              onClick={() => {
                dispatch(waveStatusChanged(PLAYER_STATUS.PAUSED));
                dispatch(globalStatusChanged(PLAYER_STATUS.PAUSED));
              }}
            >
              <IoMdPause className={styles.pauseIcon} />
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
            <div className={styles.subTitleContainer}>
              <h2 className={styles.subTitle}>{track.uploader.displayName}</h2>
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
          <Wavesurfer track={track} onLoading={handleLoading} />
        </div>
      </div>

      <div className={styles.coverImage}>
        <img
          src={track.cover ?? sampleCoverImage.current}
          style={{ objectFit: "cover" }}
          alt="cover"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
