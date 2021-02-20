import React, { useState, useEffect } from "react";
import Header from "./Header";
import "../styles/_ScanID.scss";
import { Link } from "react-router-dom";

export default function ScanID(props: any) {
  const [linkCss, setLinkCss] = useState<string>("link");
  const [btnMessage, setBtnMessage] = useState<string>("Take picture");

  useEffect(() => {
    evaluatePictureStatus();
  });

  const evaluatePictureStatus = () => {
    console.log(props.pictureStatus);
    if (props.pictureStatus === "") {
      setLinkCss("link");
      setBtnMessage("Take picture");
    } else if (props.pictureStatus === "approved") {
      setLinkCss("hiden");
    } else if (props.pictureStatus === "rejected") {
      setBtnMessage("Retake picture");
      setLinkCss("link");
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <h2 className="main-title">Scan your ID</h2>
        <p className="main-title__text">
          Take a picture. It may take time to validate your personal
          information.
        </p>
        <div className="ID">
          <div className="ID-container">
            <img
              className="ID-container__img"
              src={props.imgSrc}
              title="picture"
              alt=""
            />
            <Link to="/take-photo" title="takephoto" className={linkCss}>
              <button className="link-btn">{btnMessage}</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
