import React from "react";
import { Link } from "react-router-dom";
import alert from "../styles/assets/Alert.svg";

const FitPicture = () => {
  return (
    <>
      <div>
        <h1>Take picture</h1>
        <p>
          Fit your ID card inside the frame. The picture will be taken
          automatically.
        </p>
      </div>
      <div></div>
      <p>
        <img src={alert} alt="Icon" />
        Room lighting is too low
      </p>
      <Link to="/" className="home_link" title="Home l">
        <p className="home_link__text">Home </p>
      </Link>
    </>
  );
};
export default FitPicture;
