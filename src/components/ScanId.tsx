import React, { useState, useEffect } from "react";
import Header from "./Header";
import "../styles/App.scss";
import "../styles/_ScanID.scss";
import check from "../styles/assets/check.svg";
import fail from "../styles/assets/fail.svg";
import { Link } from "react-router-dom";

export default function ScanID(props: any) {
  const [borderPictureCss, setBorderPictureCss] = useState<string>("");
  const [linkCss, setLinkCss] = useState<string>("link");
  const [btnMessage, setBtnMessage] = useState<string>("Take picture");
  const [labelCss, setLabelCss] = useState<string>("hiden");

  useEffect(() => {
    evaluatePictureStatus();
  });

  const evaluatePictureStatus = () => {
    if (props.pictureStatus === "") {
      setLinkCss("link");
      setBtnMessage("Take picture");
    } else if (props.pictureStatus === "ACCEPTED") {
      setBorderPictureCss("accepted");
      setLinkCss("hiden");
      setLabelCss("label labelaccepted");
    } else if (props.pictureStatus === "REJECTED") {
      setBtnMessage("Retake picture");
      setBorderPictureCss("rejected");
      setLinkCss("link");
      setLabelCss("label labelrejected");
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
              className={`${borderPictureCss} ID-container__img`}
              src={props.imgSrc}
              title="picture"
              alt=""
            />
            <Link to="/take-photo" title="takephoto" className={linkCss}>
              <button className="link-btn">{btnMessage}</button>
            </Link>
            <div className={labelCss}>
              <img
                src={props.pictureStatus === "ACCEPTED" ? check : fail}
                alt={props.pictureStatus}
                data-testid="icon"
              />
              <span>{props.pictureStatus}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
