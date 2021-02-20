import React, {useState, useRef, useEffect, useCallback} from "react";
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
export default TakePhoto;