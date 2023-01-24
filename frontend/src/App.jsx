// import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";
import { FixedBottomAudioContainer } from "./components/FixedBottomAudioContainer";
import { GlobalPlaybar } from "./features/player/components/GlobalPlaybar";

//TODO: figure out react-head
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
