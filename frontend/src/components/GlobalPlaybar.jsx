import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer from "react-h5-audio-player";
import {
  globalStatusChanged,
  globalTrackLoaded,
  PLAYER_STATUS,
  selectGlobalSource,
  selectGlobalStatus,
  selectWaveSource,
  selectWaveStatus,
  waveStatusChanged,
} from "../features/player/store";
// import {
//   changePlayerStatus,
//   LOCATION,
//   pauseTrack,
//   playTrack,
//   seekTrack,
//   selectNowPlayingSource,
//   selectPlayingStatus,
//   STATUS,
// } from "../features/player/store";

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
      // onSeeked={() => console.log("onseeked")}
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

// <H5AudioPlayer
//   ref={playerRef}
//   style={{
//     backgroundColor: "#f2f2f2",
//     borderRight: "none",
//   }}
//   src={nowPlayingSource}
//   layout="horizontal-reverse"
//   showSkipControls={false}
//   showJumpControls={false}
//   customAdditionalControls={[]}
//   onSeeking={(e) => dispatch(seekTrack(e.target.currentTime))}
//   onSeeked={() => dispatch(changePlayerStatus(STATUS.PLAYING))}
//   onPlay={() =>
//     dispatch(
//       playTrack({
//         source: nowPlayingSource,
//         location: LOCATION.PLAYBAR,
//       })
//     )
//   }
//   onPause={() => dispatch(pauseTrack())}
// />
// useEffect(() => {
//   if (playerRef.current) {
//     if (isPlaying) {
//       playerRef.current.audio.current.play();
//     } else if (isPaused) {
//       playerRef.current.audio.current.pause();
//     }
//   }
// }, [playingStatus, isPlaying, isPaused]);

// useEffect(() => {
//   if (playerRef.current) {
//     if (currentPlayerStatus === PLAYER_STATUS.PLAYING) {
//       playerRef.current.audio.current.play();
//     } else if (currentPlayerStatus === PLAYER_STATUS.PAUSED) {
//       playerRef.current.audio.current.pause();
//     }
//   }
// }, [currentPlayerStatus]);
