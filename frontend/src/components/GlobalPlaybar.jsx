import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import H5AudioPlayer from "react-h5-audio-player";
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

export function GlobalPlaybar({ status, track }) {
  // console.log("global", track);

  const playerRef = useRef(null);

  return (
    <H5AudioPlayer
      style={{
        backgroundColor: "#f2f2f2",
        borderRight: "none",
      }}
      ref={playerRef}
      src={track.url}
      layout="horizontal-reverse"
      showSkipControls={false}
      showJumpControls={false}
      customAdditionalControls={[]}
      autoPlay={false}
      autoPlayAfterSrcChange={false}
      // onSeeking={(e) => console.log("onseeking")}
      // onSeeked={() => console.log("onseeked")}
      // onPlay={() => console.log("onplay")}
      // onPause={() => console.log("onpause")}
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
