// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
import AudioPlayer from "react-h5-audio-player";
import { useSelector } from "react-redux";
import { selectNowPlaying } from "./features/tracks/store";

//TODO: figure out react-head
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const nowPlaying = useSelector(selectNowPlaying);

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
      {nowPlaying ? (
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
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
