import { HeadProvider } from "react-head";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";

//TODO: figure out react-head
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
    </>
  );
}

export default App;
