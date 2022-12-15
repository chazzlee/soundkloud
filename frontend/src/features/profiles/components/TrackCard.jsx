import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef } from "react";
import { IoMdPlay } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import styles from "./UserProfilePage.module.css";

export function TrackCard({ track }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

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
    <div className={styles.trackCard}>
      <div style={{ height: "100%", width: "100%" }}>
        <img
          src={"https://i1.sndcdn.com/avatars-000007873027-acd5vm-t200x200.jpg"}
          alt="Profile"
          height={160}
          width={160}
        />
      </div>
      <div className={styles.innerTrackContainer}>
        <div className={styles.trackCardTop}>
          <button className={styles.playBtn}>
            <IoMdPlay />
          </button>
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
                <div className={styles.privateTag}>Private</div>
              )}
            </div>
          </div>
        </div>
        <div id="waveform" ref={waveformRef} />
      </div>
    </div>
  );
}
