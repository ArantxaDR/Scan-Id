import React from "react";
import { render } from "@testing-library/react";
import ScanId from "../components/ScanId";
import idBg from "../styles/assets/IDbg.svg";
import { HashRouter } from "react-router-dom";

test("icon to be check when picture is accepted", () => {
  const pictureStatus = "ACCEPTED";
  const { getByTestId } = render(
    <HashRouter>
      <ScanId pictureStatus={pictureStatus} imgSrc={idBg} />
    </HashRouter>
  );
  const icon = getByTestId("icon") as HTMLImageElement;
  expect(icon.src).toContain("check.svg");
});

test("icon to be fail when picture is rejected", () => {
  const pictureStatus = "REJECTED";
  const { getByTestId } = render(
    <HashRouter>
      <ScanId pictureStatus={pictureStatus} imgSrc={idBg} />
    </HashRouter>
  );
  const icon = getByTestId("icon") as HTMLImageElement;
  expect(icon.src).toContain("fail.svg");
});
