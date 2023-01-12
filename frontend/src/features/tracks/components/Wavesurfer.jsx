import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  changeCurrentStatus,
  currentTrackLoaded,
  globalTrackLoaded,
  PLAYER_STATUS,
  recordCurrentTime,
  removeCurrent,
  selectCurrentPlayerSource,
  selectCurrentPlayerStatus,
  selectGlobalStatus,
  selectWaveStatus,
  updateTotalDuration,
  waveTrackCleared,
  waveTrackLoaded,
} from "../../player/store";

const waveOptions = {
  waveColor: "#eee",
  progressColor: "#f50",
  cursorColor: "transparent",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 100,
  interact: false,
};
export function Wavesurfer({ track }) {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const waveStatus = useSelector(selectWaveStatus);
  const globalStatus = useSelector(selectGlobalStatus);

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        ...waveOptions,
        container: waveformRef.current,
      });
    }
  }, []);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setMute(true);
      wavesurfer.current.load(track?.upload);
      wavesurfer.current.on("ready", () => {
        const source = {
          id: track?.id,
          url: track?.upload,
          duration: wavesurfer.current.getDuration(),
        };
        dispatch(waveTrackLoaded(source));
      });
    }
  }, [dispatch, track?.id, track?.upload]);

  useEffect(() => {
    if (waveStatus === PLAYER_STATUS.PLAYING) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [waveStatus]);

  return <div id="waveform" ref={waveformRef} />;
}

// useEffect(() => {
//   if (wavesurfer.current) {
//     wavesurfer.current.setMute(true);
//     wavesurfer.current.load(track?.upload);
//     wavesurfer.current.on("loading", (progress) => {
//       // if (progress === 100) {
//       //   // dispatch(currentTrackLoaded());
//       // }
//     }); //TODO: show spinner
//     wavesurfer.current.on("ready", () => {
//       dispatch(
//         currentTrackLoaded({
//           id: track.id,
//           url: track.upload,
//           duration: wavesurfer.current.getDuration(),
//         })
//       );
//     });
//   }
// }, [dispatch, track?.id, track?.upload]);

// useEffect(() => {
//   if (currentPlayerStatus === PLAYER_STATUS.PLAYING) {
//     wavesurfer.current.play();
//   } else {
//     wavesurfer.current.pause();
//   }
// }, [currentPlayerStatus]);

// useEffect(() => {
//   return () => {
//     if (currentPlayerStatus === PLAYER_STATUS.PLAYING) {
//       dispatch(recordCurrentTime(wavesurfer.current.getCurrentTime()));
//     }
//   };
// }, [dispatch, currentPlayerStatus]);
