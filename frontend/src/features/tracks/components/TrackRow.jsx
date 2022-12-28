import styles from "./PlaylistModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

export function TrackRow({ onRemove = undefined, track = null, ...rest }) {
  return (
    <div className={styles.track}>
      {track && (
        <>
          <img
            src="https://soundkloud-seeds.s3.amazonaws.com/anata-dismay.jpg"
            alt=""
            height={20}
            width={20}
          />
          <div className={styles.innerRow}>
            <p className={styles.trackInfo} {...rest}>
              {track?.artist} - {track?.title}
            </p>
            {onRemove && (
              <button className={styles.removeTrackBtn} onClick={onRemove}>
                <IoCloseOutline />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
