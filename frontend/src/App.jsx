import { Outlet, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLandingPage ? <TopNavigation /> : null}
      <Outlet />
    </div>
  );
}

export default App;
