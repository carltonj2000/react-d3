import React from "react";

import "./App.css";

import Basics from "./Basics";
import LineAxis from "./LineAxis";
import BarColorAnimation from "./BarColorAnimation";
import BarInteractive from "./BarInteractive";
import BarResponsive from "./BarResponsive";

const HR = () => <hr style={{ marginTop: "20px" }} />;

function App() {
  return (
    <>
      <BarResponsive />
      <HR />
      <BarInteractive />
      <HR />
      <BarColorAnimation />
      <HR />
      <LineAxis />
      <HR />
      <Basics />
      <HR />
    </>
  );
}

export default App;
