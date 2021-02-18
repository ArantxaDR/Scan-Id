import React from "react";

export default function ScanEmpty() {
  return (
    <main className="scan-empty">
      <h2 className="scan-empty__title">Scan your ID</h2>
      <p className="scan-empty__text">
        Take a picture. It may take time to validate your personal information.
      </p>
      <div className="scan-empty__img">
        <button className="scan-empty__btn">Take picture</button>
      </div>
    </main>
  );
}
