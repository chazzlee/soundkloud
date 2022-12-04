import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
