import { forwardRef, useEffect, useMemo, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  PLAYER_STATUS,
  selectPlayerProgress,
  selectPlayerSource,
  selectPlayerStatus,
  trackFinished,
  trackLoaded,
  trackPlaying,
  trackResumed,
  trackSeeking,
  waveStatusChanged,
  waveTrackLoaded,
} from "../../player/store";

const PLAYER = "wave";
export const Wavesurfer = forwardRef(({ track }, ref) => {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, "global")
  );

  const globalProgress = useSelector((state) =>
    selectPlayerProgress(state, "global")
  );

  const waveSource = useSelector((state) => selectPlayerSource(state, PLAYER));
  const globalSource = useSelector((state) =>
    selectPlayerSource(state, "global")
  );

  useEffect(() => {
    const waveOptions = {
      waveColor: "#eee",
      progressColor: "#f50",
      cursorColor: "transparent",
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      normalize: true,
      height: 100, //TODO:
      interact: false,
      container: waveformRef.current,
    };
    ref.current = WaveSurfer.create(waveOptions);
    ref.current.setMute(true);
    ref.current.load(track.upload);
    ref.current.on("ready", () => {
      dispatch(
        trackLoaded({
          player: PLAYER,
          url: track.upload,
          duration: ref.current.getDuration(),
        })
      );
    });
    ref.current.on("seek", (e) => {
      dispatch(trackSeeking({ player: PLAYER, progress: e }));
      dispatch(trackResumed({ player: PLAYER }));
      ref.current.play();
    });
    ref.current.on("finish", () => {
      dispatch(trackFinished({ player: PLAYER }));
    });
    return () => {
      ref.current.cancelAjax();
      ref.current.destroy();
    };
  }, [dispatch, ref, track.upload]);

  useEffect(() => {
    switch (globalStatus) {
      case PLAYER_STATUS.PLAYING: {
        ref.current.play();
        break;
      }
      case PLAYER_STATUS.PAUSED: {
        ref.current.pause();
        break;
      }
      case PLAYER_STATUS.SEEKING: {
        ref.current.seekTo(globalProgress);
        break;
      }
      default:
        return;
    }
  }, [globalStatus, globalProgress, ref]);

  return <div id="waveform" ref={waveformRef} />;
});

// TODO: cleanup, fix wavesurfer progress after track change
// export function Wavesurfer({ track, onLoading, waveHeight = 100 }) {
//   const dispatch = useDispatch();
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const waveOptions = useMemo(
//     () => ({
//       waveColor: "#eee",
//       progressColor: "#f50",
//       cursorColor: "transparent",
//       barWidth: 3,
//       barRadius: 3,
//       responsive: true,
//       height: waveHeight,
//       interact: false,
//     }),
//     [waveHeight]
//   );

//   const waveSource = useSelector(selectWaveSource);
//   const globalSource = useSelector(selectGlobalSource, shallowEqual);
//   const globalProgress = useSelector(selectGlobalProgress);

//   useEffect(() => {
//     if (waveformRef.current && !wavesurfer.current) {
//       wavesurfer.current = WaveSurfer.create({
//         ...waveOptions,
//         container: waveformRef.current,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (wavesurfer.current) {
//       wavesurfer.current.setMute(true);
//       wavesurfer.current.load(track?.upload);
//       wavesurfer.current.on("ready", () => {
//         onLoading(false);
//         const source = {
//           id: track?.id,
//           url: track?.upload,
//           duration: wavesurfer.current.getDuration(),
//         };
//         dispatch(waveTrackLoaded(source));
//       });
//     }
//   }, [dispatch, track?.id, track?.upload, onLoading]);

//   useEffect(() => {
//     if (
//       waveSource.sourceId === globalSource.sourceId &&
//       globalSource.status === PLAYER_STATUS.PLAYING
//     ) {
//       wavesurfer.current.seekTo(globalProgress);
//       if (waveSource.status !== PLAYER_STATUS.PLAYING) {
//         dispatch(waveStatusChanged(PLAYER_STATUS.PLAYING));
//       }
//     }
//   }, [
//     dispatch,
//     globalSource.sourceId,
//     globalSource.status,
//     globalProgress,
//     waveSource.sourceId,
//     waveSource.status,
//   ]);

//   useEffect(() => {
//     if (waveSource.status === PLAYER_STATUS.PLAYING) {
//       wavesurfer.current.play();
//     } else {
//       wavesurfer.current.pause();
//     }
//   }, [
//     waveSource.status,
//     waveSource.sourceId,
//     globalSource.status,
//     globalSource.sourceId,
//     globalSource.currentTimeInSeconds,
//     globalSource.totalDuration,
//   ]);

//   return <div id="waveform" ref={waveformRef} />;
// }
