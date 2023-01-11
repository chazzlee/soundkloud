// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
// import { selectPlayingStatus, STATUS } from "./features/player/store";
// import { useSelector } from "react-redux";

import { FixedBottomAudioContainer } from "./components/FixedBottomAudioContainer";
import { AudioPlayer } from "./features/player/components/AudioPlayer";
import { GlobalPlaybar } from "./components/GlobalPlaybar";
import { useSelector } from "react-redux";

//TODO: figure out react-head
//TODO: sync playbar on wavesurfer
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // const playingStatus = useSelector(selectPlayingStatus);
  // const isInit = playingStatus === STATUS.INIT;
  // const showPlaybar = !isInit;
  // const player = useSelector((state) => state.player);

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />

      <FixedBottomAudioContainer>
        <AudioPlayer Player={GlobalPlaybar} />
      </FixedBottomAudioContainer>
    </>
  );
}

export default App;
