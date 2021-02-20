import React, { useRef, useState, useCallback, useEffect } from "react";
import WebCam from "react-webcam";
import api from "../services/Api";
import { Link } from "react-router-dom";
import alert from "../styles/assets/Alert.svg";

const TakePhoto = (props: any) => {
  const [borderPictureCss, setBorderPictureCss] = useState<string>("");

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
    }, 1000);
  }, [webcamRef, props.setImgSrc]);

  const validatePhoto = (intervalId: ReturnType<typeof setInterval>) => {
    api().then((data: string) => {
      if (data === "Approved") {
        clearInterval(intervalId);
        setBorderPictureCss("approved");
        props.setPictureStatus("approved");
        props.history.push("/");
      } else {
        setBorderPictureCss("rejected");
        props.setPictureStatus("rejected");
        props.setBtnMessage("Retake picture");
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
        <p className="camera-container__alert">
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
export default TakePhoto;
