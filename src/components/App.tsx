import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ScanID from "./ScanId";
import TakePhoto from "./TakePhoto";

import idBg from "../styles/assets/IDbg.svg";

function App() {
  const [pictureStatus, setPictureStatus] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>(idBg);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => (
            <ScanID pictureStatus={pictureStatus} imgSrc={imgSrc} />
          )}
        />

        <Route
          path="/take-photo/"
          render={(routerProps) => (
            <TakePhoto
              pictureStatus={pictureStatus}
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
