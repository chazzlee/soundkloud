import { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  changeCurrentStatus,
  currentTrackLoaded,
  PLAYER_STATUS,
  recordCurrentTime,
  removeCurrent,
  selectCurrentPlayerSource,
  selectCurrentPlayerStatus,
  updateTotalDuration,
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

  return <div id="waveform" ref={waveformRef} />;
}

// const currentTotalDuration = useSelector(
//   (state) => state.player.current.totalDuration
// );

// // TODO: amzn s3 dev bucket urls not working
// useEffect(() => {
//   if (track?.url && wavesurfer.current) {
//     wavesurfer.current.setMute(true);
//     wavesurfer.current.load(
//       "https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Rise+Of+The+Predator.mp3"
//     );

//     wavesurfer.current.on("ready", () => {
//       dispatch(updateTotalDuration(wavesurfer.current.getDuration()));
//     });
//   }
// }, [dispatch, track?.url]);
// const currentSource = useSelector(selectCurrentPlayerSource, shallowEqual);
// const currentPlayerStatus = useSelector(selectCurrentPlayerStatus);

// useEffect(() => {
//   if (waveformRef.current && !wavesurfer.current) {
//     wavesurfer.current = WaveSurfer.create({
//       ...waveOptions,
//       container: waveformRef.current,
//     });
//   }

//   return () => {
//     dispatch(removeCurrent());
//   };
// }, [dispatch]);

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
