import styles from "../pages/UserProfilePage.module.css";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { IoTrashBinOutline } from "react-icons/io5";
import { EditTrackModal } from "./EditTrackModal";
import { Wavesurfer } from "../../tracks/components/Wavesurfer";
import { destroyTrackAsync } from "../../tracks/store";
import {
  globalStatusChanged,
  globalTrackLoaded,
  PLAYER_STATUS,
  selectWaveSource,
  waveStatusChanged,
} from "../../player/store";

// TODO:
export function TrackCard({ track }) {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const waveSource = useSelector(selectWaveSource, shallowEqual);

  const handleRemove = (trackId) => {
    dispatch(destroyTrackAsync(trackId));
  };

  return (
    <>
      <div className={styles.trackCard}>
        <Link to={`${track.permalink}`}>
          <div style={{ height: "100%", width: "100%" }}>
            <img
              src={
                track.cover ??
                "https://i1.sndcdn.com/avatars-000007873027-acd5vm-t200x200.jpg"
              }
              alt="Profile"
              style={{ objectFit: "cover" }}
              height={165}
              width={160}
            />
          </div>
        </Link>
        <div className={styles.innerTrackContainer}>
          <div className={styles.trackCardTop}>
            {waveSource.status !== PLAYER_STATUS.PLAYING ? (
              <button
                title="Play"
                className={styles.playBtn}
                style={{ display: "none" }}
                onClick={() => {
                  dispatch(waveStatusChanged(PLAYER_STATUS.PLAYING));
                  dispatch(
                    globalTrackLoaded({
                      id: waveSource.sourceId,
                      url: waveSource.sourceUrl,
                      duration: waveSource.totalDuration,
                    })
                  );
                  dispatch(globalStatusChanged(PLAYER_STATUS.PLAYING));
                }}
              >
                <IoMdPlay />
              </button>
            ) : (
              <button
                title="Pause"
                className={styles.pauseBtn}
                style={{ display: "none" }}
                onClick={() => {}}
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
          <div>
            {/* <Wavesurfer track={track} onLoading={setLoading} waveHeight={28} /> */}
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
