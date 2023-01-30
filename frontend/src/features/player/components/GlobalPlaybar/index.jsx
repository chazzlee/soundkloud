import "./GlobalPlaybar.css";
import { useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  GLOBAL_PLAYER,
  WAVE_PLAYER,
  PLAYER_STATUS,
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  trackSeeked,
  progressUpdating,
  selectPlayerSource,
  updateDuration,
  selectPlayerSourceId,
} from "../../store";
import {
  playlistFinished,
  playPreviousTrack,
  playNextTrack,
  selectActivePlaylist,
  selectCurrentPlaylistTrackUrl,
} from "../../../playlists/store";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { NowPlaying } from "./NowPlaying";
// import { BiRepeat } from "react-icons/bi";

function calculateProgress(current, total) {
  return current / total ?? 0;
}

export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const activePlaylist = useSelector(selectActivePlaylist, shallowEqual);
  const currentPlaylistTrackUrl = useSelector(selectCurrentPlaylistTrackUrl);

  const waveSourceId = useSelector((state) =>
    selectPlayerSourceId(state, WAVE_PLAYER)
  );
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  const handlePlayNext = useCallback(() => {
    if (activePlaylist.next !== null) {
      dispatch(playNextTrack());
    }
  }, [dispatch, activePlaylist.next]);

  const handlePlayPrevious = useCallback(() => {
    if (activePlaylist.prev !== null) {
      dispatch(playPreviousTrack());
    }
  }, [dispatch, activePlaylist.prev]);

  const handlePlaylistFinished = useCallback(() => {
    dispatch(playlistFinished());
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

  const handlePlay = useCallback(() => {
    if (waveSourceId === globalSourceId) {
      dispatch(trackPlaying(waveSourceId));
    }
  }, [dispatch, waveSourceId, globalSourceId]);

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
      (globalStatus === PLAYER_STATUS.PLAYING &&
        (globalSourceUrl || currentPlaylistTrackUrl))
    ) {
      playerRef.current?.audio.current.play();
    } else if (
      waveStatus === PLAYER_STATUS.PAUSED ||
      globalStatus === PLAYER_STATUS.PAUSED
    ) {
      playerRef.current?.audio.current.pause();
    }
  }, [
    dispatch,
    waveStatus,
    globalStatus,
    globalSourceUrl,
    currentPlaylistTrackUrl,
  ]);

  if (!globalSourceId) {
    return null;
  }

  return (
    <H5AudioPlayer
      className="GlobalPlaybar"
      ref={playerRef}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      showDownloadProgress={false}
      customProgressBarSection={[
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME,
        <NowPlaying playlistId={activePlaylist.id} />,
      ]}
      customAdditionalControls={[]}
      customIcons={{
        play: <IoMdPlay style={{ height: 15, marginRight: -4 }} />,
        pause: <IoMdPause style={{ height: 15 }} />,
        previous: <MdSkipPrevious />,
        next: <MdSkipNext />,
      }}
      layout="horizontal-reverse"
      showSkipControls={true}
      showJumpControls={false}
      src={currentPlaylistTrackUrl ? currentPlaylistTrackUrl : globalSourceUrl}
      autoPlay={false}
      autoPlayAfterSrcChange={
        globalStatus === PLAYER_STATUS.PLAYING &&
        (currentPlaylistTrackUrl || globalSourceUrl)
      }
      onPlay={handlePlay}
      onPause={handlePause}
      onClickNext={handlePlayNext}
      onClickPrevious={handlePlayPrevious}
      onLoadedMetaData={(e) => handleUpdateDurationOnLoad(e.target.duration)}
      onSeeked={(e) => handleSeek(e.target.currentTime)}
      onListen={(e) =>
        handleUpdateProgress(e.target.currentTime, e.target.duration)
      }
      onEnded={() => {
        if (activePlaylist.id) {
          if (activePlaylist.next !== null) {
            handlePlayNext();
          } else {
            handlePlaylistFinished();
          }
        }
      }}
    />
  );
}
