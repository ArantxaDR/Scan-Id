import React from "react";
import bigBrother from "../styles/assets/bigBrother.png";
import "../styles/_Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <small className="footer-text">
        Made with <img className="footer-img" alt="" src={bigBrother} />
        by &copy;ArantxaDR 2021
      </small>
      <small className="footer-text">
        Camera by Anton Barbarov from the Noun Project
      </small>
    </div>
  );
}
