import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer from "react-h5-audio-player";
import {
  globalTimeUpdated,
  PLAYER_STATUS,
  selectPlayerStatus,
  trackLoaded,
  trackPaused,
  trackPlaying,
  trackResumed,
  trackSeeking,
} from "../features/player/store";

const PLAYER = "global";
export function GlobalPlaybar() {
  // const playerRef = useRef(null);
  // const globalSource = useSelector(selectGlobalSource, shallowEqual);
  // const globalStatus = useSelector(selectGlobalStatus);
  // const waveStatus = useSelector(selectWaveStatus);
  // const waveSource = useSelector(selectWaveSource, shallowEqual);

  // useEffect(() => {
  //   if (
  //     waveStatus === PLAYER_STATUS.LOADED &&
  //     globalStatus !== PLAYER_STATUS.PLAYING
  //   ) {
  //     dispatch(
  //       globalTrackLoaded({
  //         id: waveSource.sourceId,
  //         url: waveSource.sourceUrl,
  //         duration: waveSource.totalDuration,
  //       })
  //     );
  //   }
  // }, [
  //   dispatch,
  //   globalStatus,
  //   waveStatus,
  //   waveSource?.sourceId,
  //   waveSource?.sourceUrl,
  //   waveSource?.totalDuration,
  // ]);

  const dispatch = useDispatch();
  const waveStatus = useSelector((state) => selectPlayerStatus(state, "wave"));
  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, PLAYER)
  );
  const globalSource = useSelector((state) => state.player.global.sourceUrl);
  const waveProgress = useSelector((state) => state.player.wave);
  const playerRef = useRef(null);

  useEffect(() => {
    switch (waveStatus) {
      case PLAYER_STATUS.PLAYING: {
        playerRef.current.audio.current.play();
        break;
      }
      case PLAYER_STATUS.PAUSED: {
        playerRef.current.audio.current.pause();
        break;
      }
      default:
        return;
    }
  }, [dispatch, waveProgress, waveStatus]);

  return (
    <H5AudioPlayer
      ref={playerRef}
      style={{ backgroundColor: "#f2f2f2", borderRight: "none" }}
      customAdditionalControls={[]}
      layout="horizontal-reverse"
      showSkipControls={false}
      showJumpControls={false}
      src={globalSource}
      autoPlay={false}
      autoPlayAfterSrcChange={false}
      // onLoadedData={() => {
      //   dispatch(
      //     trackLoaded({
      //       player: PLAYER,
      //       url: playerRef.current.audio.current.currentSrc,
      //       duration: playerRef.current.audio.current.duration,
      //     })
      //   );
      // }}
      onPlay={() => dispatch(trackPlaying({ player: "wave" }))}
      onPause={() => dispatch(trackPaused({ player: "wave" }))}
      onSeeking={(e) =>
        dispatch(
          trackSeeking({
            player: "wave",
            progress:
              playerRef.current.audio.current.currentTime /
              playerRef.current.audio.current.duration,
          })
        )
      }
      onSeeked={() => dispatch(trackResumed({ player: "wave" }))}
    />
  );
}
