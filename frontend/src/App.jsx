// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import {
  pausePlaying,
  selectNowPlayingSource,
  selectPlayingFrom,
  selectPlayingStatus,
  startNowPlaying,
} from "./features/tracks/store";
import { useRef } from "react";
import { useEffect } from "react";

//TODO: figure out react-head
//TODO: sync playbar on wavesurfer
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLandingPage = location.pathname === "/";
  const nowPlaying = useSelector(selectNowPlayingSource);
  const playingStatus = useSelector(selectPlayingStatus);
  const playingFrom = useSelector(selectPlayingFrom);
  const showPlaybar = ["playing", "paused", "stopped"].includes(playingStatus);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && playingStatus === "paused") {
      playerRef.current?.audio.current.pause();
    }
  }, [playingStatus]);

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
      {showPlaybar ? (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 2,
            padding: 0,
            border: "1px solid #cecece",
          }}
        >
          <AudioPlayer
            ref={playerRef}
            style={{
              backgroundColor: "#f2f2f2",
              borderRight: "none",
            }}
            src={nowPlaying}
            layout="horizontal-reverse"
            showSkipControls={false}
            showJumpControls={false}
            customAdditionalControls={[]}
            autoPlay={true}
            onPlay={() => dispatch(startNowPlaying(nowPlaying, "playbar"))}
            onPause={() => dispatch(pausePlaying())}
            volume={playingFrom === "wave" ? 0 : 1}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
