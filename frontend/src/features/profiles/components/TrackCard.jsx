import styles from "../pages/UserProfilePage.module.css";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { IoMdPause, IoMdPlay } from "react-icons/io";

import { MdOutlineModeEditOutline, MdPlaylistAdd } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { IoTrashBinOutline } from "react-icons/io5";
import { EditTrackModal } from "./EditTrackModal";
import WaveSurfer from "wavesurfer.js";
import { destroyTrackAsync } from "../../tracks/store";
import { PLAYER_STATUS } from "../../player/store";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { TrackCardSpinner } from "./TrackCardSpinner";
import { addToPlaylistAsync } from "../../playlists/store";

// TODO:
// FIXME:fix spinner position
export function TrackCard({ track }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoaded = useCallback((state) => setLoaded(state), []);
  const handleRemove = (trackId) => {
    dispatch(destroyTrackAsync(trackId));
  };

  const handlePlay = useCallback(() => {
    wavesurfer.current.play();
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    wavesurfer.current.pause();
    setIsPlaying(false);
  }, []);

  const handleAddToPlaylist = useCallback(() => {
    console.log("TODO: NEED TO IMPLEMENT");
  }, []);

  useEffect(() => {
    const waveOptions = {
      waveColor: "#eee",
      progressColor: "#f50",
      cursorColor: "transparent",
      barWidth: 1,
      barRadius: 2,
      responsive: true,
      normalize: true,
      height: 60,
      interact: true,
      container: waveformRef.current,
    };
    wavesurfer.current = WaveSurfer.create(waveOptions);
    wavesurfer.current.load(track.upload);

    wavesurfer.current.on("ready", () => {
      handleLoaded(true);
    });

    wavesurfer.current.on("error", (error) => {
      console.log("ERROR LOADING", error);
    });

    return () => {
      wavesurfer.current.cancelAjax();
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    };
  }, [track.upload, handleLoaded]);

  return (
    <>
      <div className={styles.trackCard}>
        <Link to={`${track.permalink}`}>
          <div style={{ height: "100%", width: "100%" }}>
            <img
              src={track.cover}
              alt="Profile"
              style={{ objectFit: "cover" }}
              height={160}
              width={160}
            />
          </div>
        </Link>
        <div className={styles.innerTrackContainer}>
          <div className={styles.trackCardTop}>
            <ControlButton
              loaded={loaded}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
            />

            <div className={styles.trackCardInfo}>
              <div className={styles.trackHeaderLeft}>
                <h4>{track.uploader.displayName}</h4>
                <p style={{ width: "100%" }}>
                  {track.title} - {track.artist}
                </p>
              </div>
              <div className={styles.trackHeaderRight}>
                <p
                  style={{
                    marginBottom: "3px",
                    minWidth: "100px",
                    display: "inline-flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {formatDistanceToNow(new Date(track.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                {track.privacy === "private" && (
                  <div className={styles.privateTag}>
                    <BiLockAlt
                      style={{
                        verticalAlign: "sub",
                        fontSize: "12px",
                        marginRight: "2px",
                      }}
                    />
                    Private
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Waveform */}
          <div className="wavesurfer-container">
            <div id="waveform" ref={waveformRef} />
          </div>

          <div>
            <button
              className={styles.smBtn}
              onClick={() => setEditModalOpen(true)}
            >
              <MdOutlineModeEditOutline
                style={{
                  verticalAlign: "sub",
                  fontSize: "12px",
                  marginRight: "4px",
                }}
              />
              Edit
            </button>
            <button
              className={styles.smBtn}
              style={{ marginLeft: "4px", color: "red" }}
              onClick={() => handleRemove(track.id)}
            >
              <IoTrashBinOutline
                style={{
                  verticalAlign: "sub",
                  fontSize: "12px",
                  marginRight: "4px",
                }}
              />
              Remove
            </button>
            <button
              className={styles.smBtn}
              style={{ marginLeft: "4px" }}
              onClick={() => handleAddToPlaylist()}
            >
              <MdPlaylistAdd
                style={{
                  verticalAlign: "sub",
                  fontSize: "12px",
                  marginRight: "4px",
                }}
              />
              Add to playlist
            </button>
          </div>
        </div>
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

function ControlButton({ loaded, isPlaying, onPlay, onPause }) {
  if (!loaded) {
    // TODO: color...
    return (
      <div style={{ marginRight: 8 }}>
        <TrackCardSpinner />
      </div>
    );
  }

  return (
    <div>
      {!isPlaying ? (
        <PlayButton onPlay={onPlay} />
      ) : (
        <PauseButton onPause={onPause} />
      )}
    </div>
  );
}

function PlayButton({ onPlay }) {
  return (
    <button title="Play" className={styles.playBtn} onClick={onPlay}>
      <IoMdPlay />
    </button>
  );
}

function PauseButton({ onPause }) {
  return (
    <button title="Pause" className={styles.pauseBtn} onClick={onPause}>
      <IoMdPause />
    </button>
  );
}
