import WaveSurfer from "wavesurfer.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdPlaylistAdd } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import { PrivateBadge } from "../../../../components/PrivateBadge";
import { DefaultCover } from "../../../../components/DefaultCover";
import "./ProfileItemCard.css";

import {
  PLAYER_STATUS,
  GLOBAL_PLAYER,
  selectPlayerStatus,
  selectPlayerSourceId,
  trackPlayingFromProfile,
  trackPausedFromProfile,
} from "../../../player/store";
import { ControlButton } from "../../../../components/ControlButton";

export function ProfileItemCard({ item }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [loaded, setLoaded] = useState(true);
  const [status, setStatus] = useState(PLAYER_STATUS.LOADED);

  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  console.log("globalSourceId", globalSourceId);
  console.log("globalStatus", globalStatus);

  console.log("item id ", item.id);
  console.log("card status", status);

  const handlePlay = useCallback(() => {
    wavesurfer.current?.play();
    setStatus(PLAYER_STATUS.PLAYING);
    dispatch(
      trackPlayingFromProfile({
        id: item.id,
        upload: item.upload,
        duration: wavesurfer.current.getDuration(),
      })
    );
  }, [dispatch, item.id, item.upload]);

  const handlePause = useCallback(() => {
    wavesurfer.current?.pause();
    setStatus(PLAYER_STATUS.PAUSED);
    dispatch(trackPausedFromProfile());
  }, [dispatch]);

  // useEffect(() => {
  //   // console.clear();
  //   const waveOptions = {
  //     waveColor: "#555",
  //     progressColor: "#f50",
  //     cursorColor: "transparent",
  //     barWidth: 1,
  //     barRadius: 2,
  //     responsive: true,
  //     normalize: true,
  //     height: 60,
  //     interact: false,
  //     container: waveformRef.current,
  //   };
  //   wavesurfer.current = WaveSurfer.create(waveOptions);
  //   wavesurfer.current.setMute(true);
  //   wavesurfer.current.load(item.upload);

  //   wavesurfer.current.on("ready", () => {
  //     setLoaded(true);
  //     setStatus(PLAYER_STATUS.LOADED);
  //   });

  //   wavesurfer.current.on("finish", () => {
  //     console.log("WAVE FINISHED");
  //   });

  //   return () => {
  //     console.log("destroying");
  //     wavesurfer.current.cancelAjax();
  //     wavesurfer.current.unAll();
  //     wavesurfer.current.destroy();
  //     wavesurfer.current = null;
  //   };
  // }, [dispatch, item.id, item.upload]);

  // TODO:!!!
  // useEffect(() => {
  //   if (item.id === globalSourceId) {
  //     if (

  //       globalStatus === PLAYER_STATUS.PLAYING
  //     ) {
  //       wavesurfer.current.play();
  //       setStatus(PLAYER_STATUS.PLAYING);
  //     } else if (

  //       globalStatus === PLAYER_STATUS.PAUSED
  //     ) {
  //       wavesurfer.current.pause();
  //       setStatus(PLAYER_STATUS.PAUSED);
  //     }
  //   }
  // }, [item.id, globalSourceId, globalStatus]);

  // useEffect(() => {
  //   // Trigered from global playbar
  //   if (item.id === globalSourceId) {
  //     if (globalStatus === PLAYER_STATUS.PLAYING) {
  //       wavesurfer.current.play();
  //       setStatus(PLAYER_STATUS.PLAYING);
  //     } else if (globalStatus === PLAYER_STATUS.PAUSED) {
  //       wavesurfer.current.pause();
  //       setStatus(PLAYER_STATUS.PAUSED);
  //     }
  //   }
  // }, [item.id, globalStatus, globalSourceId]);

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
          <ControlButton
            size={"sm"}
            loaded={loaded}
            status={status}
            onPlay={handlePlay}
            onPause={handlePause}
          />
          {/* <button
            className="control-btn-sm"
            title="Play"
            aria-label="Play track"
            onClick={handlePlay}
          >
            <IoMdPlay />
          </button> */}
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
        </div>
        <div className="card-body">
          <div id="waveform" ref={waveformRef} />
        </div>
        <CardFooterActions />
      </div>
    </div>
  );
}

// TODO:
function CardHeader() {
  return <div />;
}

function CardFooterActions() {
  return (
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
  );
}

// function CardWavesurfer() {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);

//   return <div id="waveform" ref={waveformRef} />;
// }
