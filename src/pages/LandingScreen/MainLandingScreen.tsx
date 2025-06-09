import { Button } from "@mui/material";
import AnyUpload from "../../components/ImageUpload/AnyUpload";
import SuggestedUpload from "../../components/ImageUpload/SuggestedUpload";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const MainLandingScreen = () => {
  const navigate = useNavigate();

  const handleRenderButtonClick = () => {
    navigate("/render-multiple-images");
  };

  return (
    <div>
      <div className="main-heading">
        <h1>Image CO2 Emissions Comparison</h1>
        <div>
          <Button
            variant="contained"
            color="success"
            className="render-button"
            onClick={handleRenderButtonClick}
          >
            Click here to render multiple images <ArrowRightAltIcon />
          </Button>
        </div>
      </div>
      <div className="main-container">
        <AnyUpload />
        <SuggestedUpload />
      </div>
    </div>
  );
};
export default MainLandingScreen;
