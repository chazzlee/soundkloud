import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  PLAYER_STATUS,
  selectPlayerStatus,
  statusUpdated,
  trackLoaded,
  trackPaused,
  trackPlaying,
  trackResumed,
  trackSeeking,
} from "../features/player/store";
import { useCallback } from "react";

const GLOBAL_PLAYER = "global";
export function GlobalPlaybar() {
  const dispatch = useDispatch();
  const waveStatus = useSelector((state) => selectPlayerStatus(state, "wave"));
  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );
  const globalSource = useSelector((state) => state.player.global.sourceUrl);
  const waveProgress = useSelector((state) => state.player.wave);
  const playerRef = useRef(null);

  const handlePlay = useCallback(() => {
    dispatch(statusUpdated({ status: PLAYER_STATUS.PLAYING }));
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch(statusUpdated({ status: PLAYER_STATUS.PAUSED }));
  }, [dispatch]);

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
  }, [dispatch, waveProgress, waveStatus]);

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
        <div className="currently-playing">
          <div className="cover-image">
            <img
              src="https://soundkloud-dev.s3.amazonaws.com/oaleqnb65pgce6qzab6ztc6llrtp?response-content-disposition=inline%3B%20filename%3D%22dark-souls-3-artwork-pic.jpg%22%3B%20filename%2A%3DUTF-8%27%27dark-souls-3-artwork-pic.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATE7BVEO4SERJEV4V%2F20230120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230120T174925Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5142d11600a83a7527c8b984d6b52ace0b54138040b717161ed53529f13d952e"
              alt=""
            />
          </div>
          <div className="track-details">
            <p className="artist">artist</p>
            <p className="title">title</p>
          </div>
        </div>,
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
      onLoadedMetaData={(data) => console.log(data.target.duration)}
      // onSeeking={(e) =>
      //   dispatch(
      //     trackSeeking({
      //       player: "wave",
      //       progress:
      //         playerRef.current.audio.current.currentTime /
      //         playerRef.current.audio.current.duration,
      //     })
      //   )
      // }
      // onSeeked={() => dispatch(trackResumed({ player: "wave" }))}
      // onPlay={() => dispatch(trackPlaying({ player: "wave" }))}
      // onPause={() => dispatch(trackPaused({ player: "wave" }))}
      // onListen={
      // dispatch(
      //   trackSeeking({
      //     player: PLAYER,
      //     progress: e.target.currentTime,
      //   })
      // )
      // }
      // onLoadedData={() => {
      //   dispatch(
      //     trackLoaded({
      //       player: PLAYER,
      //       url: playerRef.current.audio.current.currentSrc,
      //       duration: playerRef.current.audio.current.duration,
      //     })
      //   );
      // }}
    />
  );
}

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
