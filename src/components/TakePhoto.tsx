import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/_TakePhoto.scss";
import alert from "../styles/assets/Alert.svg";
import WebCam from "react-webcam";
import api from "../services/Api";
import { withRouter } from "react-router-dom";

const TakePhoto = (props: any) => {
  const [borderPictureCss, setBorderPictureCss] = useState<string>("");
  const [iconCss, seticonCss] = useState<string>("hiden");
  const webcamRef = useRef<WebCam>(null);

  useEffect(() => {
    capture();
  }, [webcamRef]);

  const videoConstraints = {
    width: 260,
    height: 160,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    let imageSrc: string | null;
    const intervalId = setInterval(() => {
      if (webcamRef.current !== null) {
        imageSrc = webcamRef.current.getScreenshot();
        props.setImgSrc(imageSrc);
        validatePhoto(intervalId);
      }
    }, 1100);
  }, [webcamRef, props.setImgSrc]);

  const validatePhoto = (intervalId: ReturnType<typeof setInterval>) => {
    api().then((data: string) => {
      if (data === "Approved") {
        clearInterval(intervalId);
        seticonCss("hiden");
        setBorderPictureCss("approved");
        props.setPictureStatus("approved");
        props.history.push("/");
      } else {
        seticonCss("camera-container__alert");
        setBorderPictureCss("rejected");
        props.setPictureStatus("rejected");
      }
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="container-title">Take picture</h1>
        <p className="container-title__text">
          Fit your ID card inside the frame. The picture will be taken
          automatically.
        </p>
        <WebCam
          className={borderPictureCss}
          audio={false}
          height={160}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={260}
          videoConstraints={videoConstraints}
        />
        <p className={iconCss}>
          <img src={alert} alt="Icon" />
          Room lighting is too low
        </p>
        <Link to="/" className=" cancel " title="Home l">
          Cancel
        </Link>
      </div>
    </>
  );
};
export default withRouter(TakePhoto);
