// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
import AudioPlayer from "react-h5-audio-player";
import {
  changePlayerStatus,
  LOCATION,
  pauseTrack,
  playTrack,
  seekTrack,
  selectNowPlayingSource,
  selectPlayingStatus,
  setLastRecordedTime,
  STATUS,
} from "./features/player/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

//TODO: figure out react-head
//TODO: sync playbar on wavesurfer
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const nowPlayingSource = useSelector(selectNowPlayingSource);
  const playingStatus = useSelector(selectPlayingStatus);
  const isPlaying = playingStatus === STATUS.PLAYING;
  const isPaused = playingStatus === STATUS.PAUSED;
  const isInit = playingStatus === STATUS.INIT;
  const showPlaybar = !isInit;
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.audio.current.play();
      } else if (isPaused) {
        playerRef.current.audio.current.pause();
      }
    }
  }, [playingStatus, isPlaying, isPaused]);

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
      {showPlaybar ? (
        <FixedBottomAudioContainer>
          <AudioPlayer
            ref={playerRef}
            style={{
              backgroundColor: "#f2f2f2",
              borderRight: "none",
            }}
            src={nowPlayingSource}
            layout="horizontal-reverse"
            showSkipControls={false}
            showJumpControls={false}
            customAdditionalControls={[]}
            onSeeking={(e) => dispatch(seekTrack(e.target.currentTime))}
            onSeeked={() => dispatch(changePlayerStatus(STATUS.PLAYING))}
            onPlay={() =>
              dispatch(
                playTrack({
                  source: nowPlayingSource,
                  location: LOCATION.PLAYBAR,
                })
              )
            }
            onPause={() => dispatch(pauseTrack())}
          />
        </FixedBottomAudioContainer>
      ) : null}
    </>
  );
}

export default App;

function FixedBottomAudioContainer({ children }) {
  return (
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
      {children}
    </div>
  );
}
