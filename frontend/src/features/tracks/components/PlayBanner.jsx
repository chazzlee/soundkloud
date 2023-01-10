import styles from "./PlayBanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import { getRandomRGB } from "../../../utils/getRandomRGB";
import { getRandomInteger } from "../../../utils/getRandomInteger";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { BiLockAlt } from "react-icons/bi";
import {
  changePlayerStatus,
  LOCATION,
  pauseTrack,
  playTrack,
  selectPlayingStatus,
  setDurationOnLoad,
  setLastRecordedTime,
  STATUS,
} from "../../player/store";

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

// TODO: pausebtn

const headerFontSize = (track, length = MAX_LENGTH) =>
  track.artist.length + track.title.length >= length ? "20px" : "22px";

export function PlayBanner({ track }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const rgbBackground = useRef(getRandomRGB());
  const sampleCoverImage = useRef(
    sampleCovers[getRandomInteger(sampleCovers.length - 1)]
  );
  const playingStatus = useSelector(selectPlayingStatus);
  const isPaused = playingStatus === STATUS.PAUSED;
  const isPlaying = playingStatus === STATUS.PLAYING;

  const handlePlay = () => {
    dispatch(
      playTrack({
        source:
          track.upload ??
          "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3",
        location: LOCATION.WAVESURFER,
      })
    );
  };

  const handlePause = () => {
    dispatch(pauseTrack());
  };

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
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

      if (wavesurfer.current) {
        wavesurfer.current.setMute(true);
        wavesurfer.current.load(
          track?.upload ??
            "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3"
        );
        wavesurfer.current.on("ready", () => {
          dispatch(setDurationOnLoad(wavesurfer.current.getDuration()));
        });
      }
    }

    return () => {
      rgbBackground.current = null;
      dispatch(setLastRecordedTime(wavesurfer.current.getCurrentTime()));

      // TODO: cleanup wavesurfer
    };
  }, [dispatch, track.upload]);

  useEffect(() => {
    if (isPaused) {
      wavesurfer.current.pause();
    } else if (isPlaying) {
      wavesurfer.current.play();
    }
  }, [dispatch, isPaused, isPlaying]);

  return (
    <div
      className={styles.bannerPlayerContainer}
      style={{
        background: `linear-gradient(135deg, ${rgbBackground.current} 0%, rgb(11, 10, 10) 100%)`,
      }}
    >
      <div className={styles.bannerHeader}>
        <div>
          {!isPlaying ? (
            <button
              title="Play"
              className={styles.circularPlayBtn}
              onClick={() =>
                handlePlay(
                  track.upload ??
                    "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3"
                )
              }
            >
              <IoMdPlay className={styles.playIcon} />
            </button>
          ) : (
            <button
              title="Pause"
              className={styles.circularPlayBtn}
              onClick={handlePause}
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
          <div id="waveform" ref={waveformRef} />
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
