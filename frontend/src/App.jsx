import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";

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
