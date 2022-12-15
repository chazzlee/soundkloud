import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import styles from "./UserProfilePage.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { EditTrackModal } from "./EditTrackModal";
import { Link, useNavigate } from "react-router-dom";

export function TrackCard({ track }) {
  const navigate = useNavigate();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (!wavesurfer.current && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#333",
        progressColor: "#f50",
        cursorColor: "transparent",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 80,
      });
      wavesurfer.current.load(
        "https://cors-anywhere.herokuapp.com/https://download.samplelib.com/mp3/sample-15s.mp3"
      );
    }
  }, []);

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
                <p>
                  {track.title} - {track.artist}
                </p>
              </div>
              <div className={styles.trackHeaderRight}>
                <p style={{ marginBottom: "3px" }}>
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
