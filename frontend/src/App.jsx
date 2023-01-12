// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
// import { selectPlayingStatus, STATUS } from "./features/player/store";

import { FixedBottomAudioContainer } from "./components/FixedBottomAudioContainer";

import { GlobalPlaybar } from "./components/GlobalPlaybar";
import { useSelector } from "react-redux";
import { selectCurrentPlayerSource } from "./features/player/store";

//TODO: figure out react-head
//TODO: sync playbar on wavesurfer
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />

      <FixedBottomAudioContainer>
        <GlobalPlaybar />
      </FixedBottomAudioContainer>
    </>
  );
}

export default App;
