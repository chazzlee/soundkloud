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
import { ItemActionGroup } from "../../../../components/ItemActionGoup";

export function ProfileItemCard({ item, children, type = "track" }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [loaded, setLoaded] = useState(true);
  const [status, setStatus] = useState(PLAYER_STATUS.LOADED);
  const isEmptyPlaylist = type === "playlist" && item.tracks.length === 0;

  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  // console.log("globalSourceId", globalSourceId);
  // console.log("globalStatus", globalStatus);

  // console.log("item id ", item.id);
  // console.log("card status", status);

  const handlePlay = useCallback(() => {
    // TODO:
    if (type === "track") {
      wavesurfer.current?.play();
      setStatus(PLAYER_STATUS.PLAYING);
      dispatch(
        trackPlayingFromProfile({
          id: item.id,
          upload: item.upload,
          duration: wavesurfer.current.getDuration(),
        })
      );
    }
  }, [dispatch, type, item.id, item.upload]);

  const handlePause = useCallback(() => {
    if (type === "track") {
      wavesurfer.current?.pause();
      setStatus(PLAYER_STATUS.PAUSED);
      dispatch(trackPausedFromProfile());
    }
  }, [dispatch, type]);

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
      height: 80,
      interact: false,
      container: waveformRef.current,
    };

    if (isEmptyPlaylist) {
      // Don't load wavesurfer if playlist has no tracks
      return;
    }

    wavesurfer.current = WaveSurfer.create(waveOptions);
    wavesurfer.current.setMute(true);
    wavesurfer.current.load(
      type === "playlist" ? item.tracks[0].upload : item.upload
    );

    wavesurfer.current.on("ready", () => {
      setLoaded(true);
      setStatus(PLAYER_STATUS.LOADED);
    });

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
  }, [dispatch, item?.id, type, item.tracks, item.upload, isEmptyPlaylist]);

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
      <Link className="profile-item-image" to={item.permalink}>
        <ProfileItemCover coverUrl={item.cover} title={item.title} />
      </Link>
      <div className="inner-card-container">
        <div className="card-header">
          <ControlButton
            size={"sm"}
            loaded={isEmptyPlaylist ? false : loaded}
            status={status}
            onPlay={handlePlay}
            onPause={handlePause}
          />
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
              <PrivateBadge privacy={item.privacy} small={true} />
            </div>
          </div>
        </div>
        <div className="card-body">
          {isEmptyPlaylist ? (
            <div className="empty-playlist-container">
              <p>This playlist has no tracks yet</p>
            </div>
          ) : (
            <div id="waveform" ref={waveformRef} />
          )}
        </div>
        {children}
        <ItemActionGroup type={type} item={item} size="sm" />
      </div>
    </div>
  );
}

// function CardWavesurfer() {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);

//   return <div id="waveform" ref={waveformRef} />;
// }
function ProfileItemCover({ coverUrl, title = "Cover" }) {
  return coverUrl ? (
    <img src={coverUrl} alt={title} />
  ) : (
    <DefaultCover size={160} />
  );
}
