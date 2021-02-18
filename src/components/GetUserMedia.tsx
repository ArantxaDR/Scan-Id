import React, { useEffect, useRef } from "react";
import Idbg from "../styles/assets/ID bg.svg";
import "../styles/_GetUserMedia.scss";

const GetUserMedia = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        if (null !== video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    const width = 320;
    const height = 240;
    let ctx = photo?.getContext("2d");

    if (null !== photo) {
      photo.width = width;
      photo.height = height;
    }

    return setInterval(() => {
      let color = colorRef.current;

      if (null != ctx && null !== video && null !== color) {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;

        color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;
      }
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    if (null !== photo && null !== strip) {
      const data = photo.toDataURL("image/jpeg");

      console.warn(data);
      const link = document.createElement("a");
      link.href = data;
      link.setAttribute("download", "myWebcam");
      link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
      strip.insertBefore(link, strip.firstChild);
    }
  };

  return (
    <main className="scan-empty">
      <div ref={colorRef} className="scene"></div>
      <h2 className="scan-empty__title">Scan your ID</h2>
      <p className="scan-empty__text">
        Take a picture. It may take time to validate your personal information.
      </p>
      <div className="scan-empty__img">
        <img src={Idbg} alt="" />
        <button onClick={() => takePhoto()} className="scan-empty__btn">
          Take picture
        </button>
        <video
          onCanPlay={() => paintToCanvas()}
          ref={videoRef}
          className="player"
        />
        <canvas ref={photoRef} className="photo" />
      </div>
    </main>
  );
};

export default GetUserMedia;
