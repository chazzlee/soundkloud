import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//TODO: figure out react-head
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
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
          style={{ backgroundColor: "#f2f2f2" }}
          layout="horizontal"
        />
      </div>
    </>
  );
}

export default App;
