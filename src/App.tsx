import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import MainLandingScreen from "./pages/LandingScreen/MainLandingScreen";
import RenderMultipleImages from "./pages/RenderMultipleImages/RenderMultipleImages";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLandingScreen />} />
          <Route
            path="/render-multiple-images"
            element={<RenderMultipleImages />}
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
