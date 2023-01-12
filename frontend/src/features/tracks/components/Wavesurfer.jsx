import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  PLAYER_STATUS,
  selectGlobalSource,
  selectWaveSource,
  waveStatusChanged,
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

  const waveSource = useSelector(selectWaveSource);
  const globalSource = useSelector(selectGlobalSource, shallowEqual);

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
    if (
      waveSource.sourceId === globalSource.sourceId &&
      globalSource.status === PLAYER_STATUS.PLAYING
    ) {
      wavesurfer.current.seekTo(
        globalSource.currentTimeInSeconds / globalSource.totalDuration
      );
      dispatch(waveStatusChanged(PLAYER_STATUS.PLAYING));
    }
  }, [
    dispatch,
    globalSource.currentTimeInSeconds,
    globalSource.totalDuration,
    globalSource.sourceId,
    globalSource.status,
    waveSource.sourceId,
  ]);

  useEffect(() => {
    if (waveSource.status === PLAYER_STATUS.PLAYING) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [
    waveSource.status,
    waveSource.sourceId,
    globalSource.status,
    globalSource.sourceId,
    globalSource.currentTimeInSeconds,
    globalSource.totalDuration,
  ]);

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
