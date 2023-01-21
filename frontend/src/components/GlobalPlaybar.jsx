import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  PLAYER_STATUS,
  progressUpdating,
  selectCurrentlyPlaying,
  selectPlayerStatus,
  trackPaused,
  trackPlaying,
  trackSeeked,
  WAVE_PLAYER,
} from "../features/player/store";
import { useCallback } from "react";

function calculateProgress(current, total) {
  return current / total ?? 0;
}

export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const waveStatus = useSelector((state) =>
    selectPlayerStatus(state, WAVE_PLAYER)
  );
  const globalSource = useSelector((state) => state.player.global.sourceUrl);
  const playerRef = useRef(null);

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

  const handleUpdateProgress = useCallback(
    (currentTime, duration) => {
      if (Number.isNaN(currentTime) || Number.isNaN(duration)) return;

      dispatch(progressUpdating(calculateProgress(currentTime, duration)));
    },
    [dispatch]
  );

  useEffect(() => {
    switch (waveStatus) {
      case PLAYER_STATUS.PLAYING: {
        playerRef.current?.audio.current.play();
        break;
      }
      case PLAYER_STATUS.PAUSED: {
        playerRef.current?.audio.current.pause();
        break;
      }
      default:
        return;
    }
  }, [dispatch, waveStatus]);

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
      layout="horizontal-reverse"
      showSkipControls={false}
      showJumpControls={false}
      src={globalSource}
      autoPlay={false}
      autoPlayAfterSrcChange={false}
      onPlay={handlePlay}
      onPause={handlePause}
      onLoadedMetaData={(data) => {}}
      onSeeked={(e) => handleSeek(e.target.currentTime)}
      onListen={(e) =>
        handleUpdateProgress(e.target.currentTime, e.target.duration)
      }
      onEnded={() => console.log("GLOBAL FINISH")}
    />
  );
}

function CurrentlyPlaying() {
  const track = useSelector(selectCurrentlyPlaying);

  return (
    <div className="currently-playing">
      <div className="cover-image">
        <img src={track?.cover} alt={track?.title} />
      </div>
      <div className="track-details">
        <p className="artist">{track?.artist}</p>
        <p className="title">{track?.title}</p>
      </div>
    </div>
  );
}
