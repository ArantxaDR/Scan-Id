import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
//components
import ScanID from "./ScanId";
import TakePhoto from "./TakePhoto";
import idBg from "../styles/assets/IDbg.svg";

function App() {
  const [btnMessage, setBtnMessage] = useState<string>("Take picture");
  const [pictureStatus, setPictureStatus] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>(idBg);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => (
            <ScanID
              btnMessage={btnMessage}
              pictureStatus={pictureStatus}
              imgSrc={imgSrc}
            />
          )}
        />

        <Route
          path="/take-photo/"
          render={(routerProps) => (
            <TakePhoto
              setBtnMessage={setBtnMessage}
              setPictureStatus={setPictureStatus}
              setImgSrc={setImgSrc}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default App;
