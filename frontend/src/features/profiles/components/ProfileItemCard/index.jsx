import WaveSurfer from "wavesurfer.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { PrivateBadge } from "../../../../components/PrivateBadge";
import { DefaultCover } from "../../../../components/DefaultCover";
import "./ProfileItemCard.css";
import { PLAYER_STATUS } from "../../../player/store";
import {
  ControlButton,
  PlayButton,
} from "../../../../components/ControlButton";
import { ItemActionGroup } from "../../../../components/ItemActionGoup";

export function ProfileItemCard({
  item,
  children,
  playingId,
  isPlaying,
  onPlaying,
  type = "track",
}) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [loaded, setLoaded] = useState(true);
  const [status, setStatus] = useState(PLAYER_STATUS.LOADED);
  const navigate = useNavigate();
  const isEmptyPlaylist = type === "playlist" && item.tracks.length === 0;

  const handlePlay = useCallback(() => {
    if (type === "track") {
      wavesurfer.current?.play();
      setStatus(PLAYER_STATUS.PLAYING);
      onPlaying({ isPlaying: true, playingId: item.id });
    }
  }, [type, onPlaying, item.id]);

  const handlePause = useCallback(() => {
    if (type === "track") {
      wavesurfer.current?.pause();
      setStatus(PLAYER_STATUS.PAUSED);
      onPlaying({ isPlaying: false, playingId: item.id });
    }
  }, [type, onPlaying, item.id]);

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
      interact: true,
      container: waveformRef.current,
    };

    if (isEmptyPlaylist) {
      // Don't load wavesurfer if playlist has no tracks
      return;
    }

    wavesurfer.current = WaveSurfer.create(waveOptions);
    wavesurfer.current.load(
      type === "playlist" ? item.tracks[0].upload : item.upload
    );

    wavesurfer.current.on("ready", () => {
      setLoaded(true);
      setStatus(PLAYER_STATUS.LOADED);
    });

    return () => {
      wavesurfer.current.cancelAjax();
      wavesurfer.current.unAll();
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    };
  }, [dispatch, item?.id, type, item.tracks, item.upload, isEmptyPlaylist]);

  useEffect(() => {
    if (isPlaying && playingId !== item.id) {
      wavesurfer.current.pause();
      setStatus(PLAYER_STATUS.PAUSED);
    }
  }, [isPlaying, item.id, playingId]);

  return (
    <div className="profile-item-card">
      <Link className="profile-item-image" to={item.permalink}>
        <ProfileItemCover coverUrl={item.cover} title={item.title} />
      </Link>
      <div className="inner-card-container">
        <div className="card-header">
          {type === "track" ? (
            <ControlButton
              size={"sm"}
              loaded={isEmptyPlaylist ? false : loaded}
              status={status}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          ) : (
            <PlaylistPlayDemoButton permalink={item.permalink} />
          )}
          <div className="card-heading">
            <div className="card-details">
              <Link className="card-user" to={`/${item.uploader.slug}`}>
                {item.uploader.displayName}
              </Link>
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

function ProfileItemCover({ coverUrl, title = "Cover" }) {
  return coverUrl ? (
    <img src={coverUrl} alt={title} />
  ) : (
    <DefaultCover size={160} />
  );
}

function PlaylistPlayDemoButton({ permalink }) {
  const navigate = useNavigate();
  const handleNavigateToPlaylist = useCallback(
    () => navigate(permalink),
    [permalink, navigate]
  );

  return (
    <div className="control-button">
      <PlayButton size={"sm"} onPlay={handleNavigateToPlaylist} />
    </div>
  );
}
