import React from "react";
//components
import Header from "./Header";

import "../styles/App.scss";

function App() {
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
            <button className="btn">Take picture</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
