import WaveSurfer from "wavesurfer.js";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdPlaylistAdd } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import { Wavesurfer } from "../../../tracks/components/Wavesurfer";
import { PrivateBadge } from "../../../../components/PrivateBadge";
import { DefaultCover } from "../../../../components/DefaultCover";
import "./ProfileItemCard.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { trackPlaying } from "../../../player/store";
/* <Wavesurfer
    ref={wavesurfer}
    track={item}
    onLoaded={handleLoaded}
    waveHeight={60}
    waveColor="#555"
    location="profile"
  /> */
export function ProfileItemCard({ item }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback((state) => setLoaded(state), []);

  const handlePlay = useCallback(() => {
    wavesurfer.current?.play();
  }, []);

  useEffect(() => {
    // console.clear();
    const waveOptions = {
      waveColor: "#555",
      progressColor: "#f50",
      cursorColor: "transparent",
      barWidth: 1,
      barRadius: 2,
      responsive: true,
      normalize: true,
      height: 60,
      interact: false,
      container: waveformRef.current,
    };
    wavesurfer.current = WaveSurfer.create(waveOptions);
    wavesurfer.current.setMute(true);
    wavesurfer.current.load(item.upload);

    wavesurfer.current.on("ready", () => {});

    wavesurfer.current.on("finish", () => {
      console.log("WAVE FINISHED");
    });

    return () => {
      console.log("destroying");
      wavesurfer.current.cancelAjax();
      wavesurfer.current.unAll();
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    };
  }, [item.upload]);

  return (
    <div className="profile-item-card">
      <div className="profile-item-image">
        {/* TODO: default...if no cover */}
        {item.cover ? (
          <img src={item.cover} alt={item.title} />
        ) : (
          <DefaultCover size={160} />
        )}
      </div>
      <div className="inner-card-container">
        <div className="card-header">
          <button
            className="control-btn-sm"
            title="Play"
            aria-label="Play track"
            onClick={handlePlay}
          >
            <IoMdPlay />
          </button>
          <div className="card-heading">
            <div className="card-details">
              <p className="card-user">{item.uploader.displayName}</p>
              <p className="card-time">
                <time>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </p>
            </div>
            <div className="card-title">
              <Link to={item.permalink} className="card-link">
                {item.title}
              </Link>
              <PrivateBadge privacy={"private"} small={true} />
            </div>
          </div>

          <div className="wavesurfer-container">
            <div id="waveform" ref={waveformRef} />
          </div>
        </div>
        <div className="card-actions-footer">
          <button className="card-action-btn" onClick={() => {}}>
            <MdPlaylistAdd />
            Add to playlist
          </button>
          <button className="card-action-btn" onClick={() => {}}>
            <MdOutlineEdit />
            Edit
          </button>
          <button className="card-action-btn" onClick={() => {}}>
            <IoTrashBinOutline />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
