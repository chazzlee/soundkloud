import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import styles from "./UserProfilePage.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { IoTrashBinOutline } from "react-icons/io5";
import { EditTrackModal } from "./EditTrackModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { destroyTrackAsync } from "../../tracks/store";

export function TrackCard({ track }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleRemove = (trackId) => {
    dispatch(destroyTrackAsync(trackId));
  };

  useEffect(() => {
    if (!wavesurfer.current && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#333",
        progressColor: "#f50",
        cursorColor: "transparent",
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 55,
      });
      wavesurfer.current.load(
        "https://cors-anywhere.herokuapp.com/" +
          "https://soundkloud-seeds.s3.amazonaws.com/tracks/05+-+No+Will+to+Live.mp3"
      );
    }
  }, [track]);

  return (
    <>
      <div className={styles.trackCard}>
        <Link to={`${track.permalink}`}>
          <div style={{ height: "100%", width: "100%" }}>
            <img
              src={
                "https://i1.sndcdn.com/avatars-000007873027-acd5vm-t200x200.jpg"
              }
              alt="Profile"
              height={160}
              width={160}
            />
          </div>
        </Link>
        <div className={styles.innerTrackContainer}>
          <div className={styles.trackCardTop}>
            {!isPlaying ? (
              <button
                title="Play"
                className={styles.playBtn}
                onClick={() => {
                  wavesurfer.current?.play();
                  setIsPlaying(true);
                }}
              >
                <IoMdPlay />
              </button>
            ) : (
              <button
                title="Pause"
                className={styles.pauseBtn}
                onClick={() => {
                  wavesurfer.current?.pause();
                  setIsPlaying(false);
                }}
              >
                <IoMdPause />
              </button>
            )}
            <div className={styles.trackCardInfo}>
              <div className={styles.trackHeaderLeft}>
                <h4>{track.uploader.displayName}</h4>
                <p style={{ width: "100%" }}>
                  {track.title} - {track.artist}
                </p>
              </div>
              <div className={styles.trackHeaderRight}>
                <p style={{ marginBottom: "3px", minWidth: "100px" }}>
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
          <div id="waveform" ref={waveformRef} />
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
