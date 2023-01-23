import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  GLOBAL_PLAYER,
  WAVE_PLAYER,
  PLAYER_STATUS,
  selectCurrentlyPlaying,
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  trackSeeked,
  progressUpdating,
  selectPlayerSource,
  updateDuration,
  selectPlayerSourceId,
} from "../features/player/store";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import {
  playNext,
  selectActivePlaylistId,
  selectActivePlaylistTracks,
  selectCurrentPlaylistTrackUrl,
} from "../features/playlists/store";
import { useState } from "react";

function calculateProgress(current, total) {
  return current / total ?? 0;
}

export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const activePlaylistId = useSelector(selectActivePlaylistId);
  const currentPlaylistTrackUrl = useSelector(selectCurrentPlaylistTrackUrl);

  const handlePlayNext = useCallback(() => {
    dispatch(playNext());
  }, [dispatch]);

  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );

  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );

  const globalSourceUrl = useSelector((state) =>
    selectPlayerSource(state, GLOBAL_PLAYER)
  );

  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  const waveSourceId = useSelector((state) =>
    selectPlayerSourceId(state, WAVE_PLAYER)
  );

  const handlePlay = useCallback(() => {
    dispatch(trackPlaying());
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(trackPaused());
  }, [dispatch]);

  const handleSeek = useCallback(
    (currentTime) => {
      dispatch(trackSeeked(currentTime));
    },
    [dispatch]
  );

  const handleUpdateDurationOnLoad = useCallback(
    (duration) => {
      if (Number.isNaN(duration)) return;

      dispatch(updateDuration(duration));
    },
    [dispatch]
  );

  const handleUpdateProgress = useCallback(
    (currentTime, duration) => {
      if (Number.isNaN(currentTime) || Number.isNaN(duration)) return;

      dispatch(progressUpdating(calculateProgress(currentTime, duration)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      waveStatus === PLAYER_STATUS.PLAYING ||
      globalStatus === PLAYER_STATUS.PLAYING
    ) {
      playerRef.current?.audio.current.play();
    } else if (waveStatus === PLAYER_STATUS.PAUSED) {
      playerRef.current?.audio.current.pause();
    }
  }, [dispatch, waveStatus, globalStatus]);

  // if (!globalSourceId || globalStatus === PLAYER_STATUS.IDLE) {
  //   return null;
  // }

  return (
    <H5AudioPlayer
      className="global-playbar"
      ref={playerRef}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      showDownloadProgress={false}
      customProgressBarSection={[
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME,
        <CurrentlyPlaying />,
      ]}
      customAdditionalControls={[]}
      customIcons={{
        play: (
          <IoMdPlay
            size={"50%"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ),
        pause: (
          <IoMdPause
            size={"50%"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ),
      }}
      layout="horizontal-reverse"
      showSkipControls={false}
      showJumpControls={false}
      src={currentPlaylistTrackUrl ? currentPlaylistTrackUrl : globalSourceUrl}
      autoPlay={false}
      autoPlayAfterSrcChange={globalStatus === PLAYER_STATUS.PLAYING}
      onPlay={handlePlay}
      onPause={handlePause}
      onLoadedMetaData={(e) => {
        if (!activePlaylistId) {
          handleUpdateDurationOnLoad(e.target.duration);
        }
      }}
      onSeeked={(e) => handleSeek(e.target.currentTime)}
      onListen={(e) => {
        if (!activePlaylistId) {
          handleUpdateProgress(e.target.currentTime, e.target.duration);
        }
      }}
      onEnded={() => {
        if (activePlaylistId) {
          handlePlayNext();
        }
      }}
    />
  );
}

function CurrentlyPlaying() {
  const track = useSelector(selectCurrentlyPlaying);

  return (
    <Link to={track?.permalink}>
      <div className="currently-playing">
        <div className="cover-image">
          <img src={track?.cover} alt={track?.title} />
        </div>
        <div className="track-details">
          <p className="artist">{track?.artist}</p>
          <p className="title">{track?.title}</p>
        </div>
      </div>
    </Link>
  );
}
