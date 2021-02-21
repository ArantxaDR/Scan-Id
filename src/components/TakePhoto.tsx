import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/_TakePhoto.scss";
import "../styles/App.scss";
import alert from "../styles/assets/Alert.svg";
import api from "../services/Api";
import { withRouter } from "react-router-dom";

const TakePhoto = (props: any) => {
  const [borderPictureCss, setBorderPictureCss] = useState<string>("");
  const [iconCss, seticonCss] = useState<string>("hiden");

  const intervalId = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoConstraints = {
    width: 260,
    height: 160,
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: videoConstraints.width,
          height: videoConstraints.height,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video !== null) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const stopVideo = () => {
    const video = videoRef.current;

    clearInterval(intervalId.current);

    if (video !== null) {
      const stream = video.srcObject as MediaStream;
      if (stream !== null) {
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
          track.stop();
        });
      }

      video.srcObject = null;
    }
  };

  const capture = useCallback(() => {
    let imgUrl: string = "";
    let video = videoRef.current;

    const photo = document.createElement("canvas");
    let ctx = photo?.getContext("2d");

    if (photo !== null) {
      photo.width = videoConstraints.width;
      photo.height = videoConstraints.height;
    }

    intervalId.current = window.setInterval(() => {
      if (ctx !== null && video !== null) {
        ctx.drawImage(
          video,
          0,
          0,
          videoConstraints.width,
          videoConstraints.height
        );
        imgUrl = photo.toDataURL("image/jpg");
        props.setImgSrc(imgUrl);
        validatePhoto(imgUrl);
      }
    }, 1500);
  }, [videoRef, props.setImgSrc, intervalId]);

  const validatePhoto = (imgUrl: string) => {
    api(imgUrl).then((data: string) => {
      if (data === "Approved") {
        seticonCss("hiden");
        setBorderPictureCss("accepted");
        props.setPictureStatus("ACCEPTED");
        stopVideo();
        props.history.push("/");
      } else {
        seticonCss("camera-container__alert");
        setBorderPictureCss("rejected");
        props.setPictureStatus("REJECTED");
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
        <video
          className={`${borderPictureCss} camera-container mirror`}
          muted
          onCanPlay={() => capture()}
          ref={videoRef}
        />
        <p className={iconCss}>
          <img src={alert} alt="Alert" />
          Room lighting is too low
        </p>
        <Link to="/" className=" cancel " title="Home l" onClick={stopVideo}>
          Cancel
        </Link>
      </div>
    </>
  );
};
export default withRouter(TakePhoto);
