import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer from "react-h5-audio-player";
import {
  globalDurationUpdated,
  globalStatusChanged,
  globalTimeUpdated,
  globalTrackLoaded,
  PLAYER_STATUS,
  selectGlobalSource,
  selectGlobalStatus,
  selectWaveSource,
  selectWaveStatus,
  waveStatusChanged,
} from "../features/player/store";

export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const globalSource = useSelector(selectGlobalSource, shallowEqual);
  const globalStatus = useSelector(selectGlobalStatus);
  const waveStatus = useSelector(selectWaveStatus);
  const waveSource = useSelector(selectWaveSource, shallowEqual);

  useEffect(() => {
    if (
      waveStatus === PLAYER_STATUS.LOADED &&
      globalStatus !== PLAYER_STATUS.PLAYING
    ) {
      dispatch(
        globalTrackLoaded({
          id: waveSource.sourceId,
          url: waveSource.sourceUrl,
          duration: waveSource.totalDuration,
        })
      );
    }
  }, [
    dispatch,
    globalStatus,
    waveStatus,
    waveSource?.sourceId,
    waveSource?.sourceUrl,
    waveSource?.totalDuration,
  ]);

  useEffect(() => {
    if (playerRef.current) {
      if (globalStatus === PLAYER_STATUS.PLAYING) {
        playerRef.current.audio.current.play();
      } else if (globalStatus === PLAYER_STATUS.PAUSED) {
        playerRef.current.audio.current.pause();
      }
    }
  }, [globalStatus]);

  return (
    <H5AudioPlayer
      style={{
        backgroundColor: "#f2f2f2",
        borderRight: "none",
      }}
      ref={playerRef}
      src={globalSource?.sourceUrl}
      layout="horizontal-reverse"
      showSkipControls={false}
      showJumpControls={false}
      customAdditionalControls={[]}
      autoPlay={false}
      autoPlayAfterSrcChange={globalStatus === PLAYER_STATUS.PLAYING}
      onSeeking={(e) => console.log(e.target.currentTime)}
      onListen={(e) => dispatch(globalTimeUpdated(e.target.currentTime))}
      onLoadedData={(e) => dispatch(globalDurationUpdated(e.target.duration))}
      onPlay={() => {
        if (globalSource.sourceId === waveSource.sourceId) {
          dispatch(waveStatusChanged(PLAYER_STATUS.PLAYING));
        }
        dispatch(globalStatusChanged(PLAYER_STATUS.PLAYING));
      }}
      onPause={() => {
        if (globalSource.sourceId === waveSource.sourceId) {
          dispatch(waveStatusChanged(PLAYER_STATUS.PAUSED));
        }
        dispatch(globalStatusChanged(PLAYER_STATUS.PAUSED));
      }}
    />
  );
}
