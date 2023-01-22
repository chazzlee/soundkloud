import { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  PLAYER_STATUS,
  WAVE_PLAYER,
  GLOBAL_PLAYER,
  selectPlayerProgress,
  selectPlayerSourceId,
  selectPlayerStatus,
  trackLoaded,
} from "../../player/store";

export const Wavesurfer = forwardRef(({ track, onLoaded }, ref) => {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);

  const globalProgress = useSelector((state) =>
    selectPlayerProgress(state, GLOBAL_PLAYER)
  );

  const globalStatus = useSelector((state) =>
    selectPlayerStatus(state, GLOBAL_PLAYER)
  );

  const waveSourceId = useSelector((state) =>
    selectPlayerSourceId(state, WAVE_PLAYER)
  );
  const globalSourceId = useSelector((state) =>
    selectPlayerSourceId(state, GLOBAL_PLAYER)
  );

  useEffect(() => {
    // console.clear();

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
      onLoaded(true);
      dispatch(
        trackLoaded({
          id: track.id,
          url: track.upload,
          duration: ref.current.getDuration(),
        })
      );
    });

    ref.current.on("finish", () => {
      console.log("FINISHED");
    });

    return () => {
      console.log("destroying");
      ref.current.cancelAjax();
      ref.current.destroy();
      ref.current = null;
    };
  }, [dispatch, ref, track.id, track.upload, onLoaded]);

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
      default:
        return;
    }
  }, [globalStatus, ref, dispatch]);

  useEffect(() => {
    if (globalSourceId === waveSourceId) {
      ref.current.seekTo(globalProgress);
    }
  }, [globalProgress, globalSourceId, waveSourceId, ref]);

  return <div id="waveform" ref={waveformRef} />;
});
// export const Wavesurfer = forwardRef(({ track }, ref) => {
//   const dispatch = useDispatch();
//   const waveformRef = useRef(null);
//   const globalStatus = useSelector((state) =>
//     selectPlayerStatus(state, GLOBAL_PLAYER)
//   );
//   const waveStatus = useSelector((state) =>
//     selectPlayerStatus(state, WAVE_PLAYER)
//   );

//   const globalProgress = useSelector((state) =>
//     selectPlayerProgress(state, GLOBAL_PLAYER)
//   );

//   const waveSource = useSelector((state) =>
//     selectPlayerSource(state, WAVE_PLAYER)
//   );
//   const globalSource = useSelector((state) =>
//     selectPlayerSource(state, GLOBAL_PLAYER)
//   );

//   const waveSourceId = useSelector((state) =>
//     selectPlayerSourceId(state, WAVE_PLAYER)
//   );
//   const globalSourceId = useSelector((state) =>
//     selectPlayerSourceId(state, GLOBAL_PLAYER)
//   );

//   useEffect(() => {
//     const waveOptions = {
//       waveColor: "#eee",
//       progressColor: "#f50",
//       cursorColor: "transparent",
//       barWidth: 3,
//       barRadius: 3,
//       responsive: true,
//       normalize: true,
//       height: 100, //TODO:
//       interact: false,
//       container: waveformRef.current,
//     };
//     ref.current = WaveSurfer.create(waveOptions);
//     ref.current.setMute(true);
//     ref.current.load(track.upload);
//     ref.current.on("ready", () => {
//       dispatch(
//         trackLoaded({
//           player: WAVE_PLAYER,
//           id: track.id,
//           url: track.upload,
//           duration: ref.current.getDuration(),
//         })
//       );
//     });
//     ref.current.on("seek", (e) => {
//       dispatch(trackSeeking({ player: WAVE_PLAYER, progress: e }));
//       dispatch(trackResumed({ player: WAVE_PLAYER }));
//       ref.current.play();
//     });
//     ref.current.on("finish", () => {
//       dispatch(trackFinished({ player: WAVE_PLAYER }));
//     });
//     return () => {
//       ref.current.cancelAjax();
//       ref.current.destroy();
//     };
//   }, [dispatch, ref, track.id, track.upload]);

//   useEffect(() => {
//     switch (globalStatus) {
//       case PLAYER_STATUS.PLAYING: {
//         ref.current.play();
//         break;
//       }
//       case PLAYER_STATUS.PAUSED: {
//         ref.current.pause();
//         break;
//       }
//       case PLAYER_STATUS.SEEKING: {
//         ref.current.seekTo(globalProgress);
//         break;
//       }
//       default:
//         return;
//     }
//   }, [globalStatus, globalProgress, ref]);

//   useEffect(() => {
//     if (
//       waveStatus === PLAYER_STATUS.LOADED &&
//       globalStatus === PLAYER_STATUS.PLAYING &&
//       waveSourceId === globalSourceId
//     ) {
//       ref.current.seekTo(globalProgress);
//     }
//   }, [
//     waveStatus,
//     globalStatus,
//     waveSourceId,
//     globalSourceId,
//     globalProgress,
//     ref,
//   ]);

//   return <div id="waveform" ref={waveformRef} />;
// });
// ------------------------------------------------------------------------------//

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
