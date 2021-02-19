import React from "react";
import { Route, Switch } from "react-router-dom";
//components
import Header from "./Header";

import "../styles/App.scss";

function App() {
  return (
    <>
      <Header />
      <Route exact path="/">
        <main className="main">
          <h2 className="main-title">Scan your ID</h2>
          <p className="main-title__text">
            Take a picture. It may take time to validate your personal
            information.
          </p>
          <div className="ID">
            <div className="ID-container">
              <button className="btn">Take picture</button>
            </div>
          </div>
        </main>
      </Route>
      <Switch>
        <Route path="/take-photo/" render={renderTakePhoto} />
      </Switch>
    </>
  );
}

export default App;
