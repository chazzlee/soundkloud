import { useEffect, useMemo, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  PLAYER_STATUS,
  selectGlobalProgress,
  selectGlobalSource,
  selectWaveSource,
  waveStatusChanged,
  waveTrackLoaded,
} from "../../player/store";

export function Wavesurfer({ track }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (!wavesurfer.current) {
      console.log("creating wavesurfer..");
      const waveOptions = {
        waveColor: "#eee",
        progressColor: "#f50",
        cursorColor: "transparent",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        normalize: true,
        height: 100, //TODO:
        container: waveformRef.current,
      };
      wavesurfer.current = WaveSurfer.create(waveOptions).load(track.upload);
    }

    return () => {
      console.log("TODO: cleanup wavesurfer");
    };
  }, [track.upload]);

  // useEffect(() => {
  //   console.log(waveformRef.current);
  // }, []);

  return <div id="waveform" ref={waveformRef} />;
}

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
