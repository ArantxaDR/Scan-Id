import React, { useState } from "react";
import Header from "./Header";
import "../styles/_ScanID.scss";
import { Link } from "react-router-dom";

export default function ScanID(props: any) {
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
            <Link to="/take-photo" title="takephoto" className="link">
              <button className="link-btn">{props.btnMessage}</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
