import React from "react";
import { select, line, curveCardinal } from "d3";

import "./App.css";

import Basics from "./Basics";

function App() {
  const [data, dataSet] = React.useState([25, 30, 45, 50, 20, 65, 75]);
  const svgRef = React.useRef();

  React.useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((v, i) => i * 50)
      .y(v => 150 - v)
      .curve(curveCardinal);
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", v => myLine(data))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  const tutorial = 0;
  if (tutorial === 1) return <Basics />;
  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
      </svg>
      <hr />
      <button onClick={() => dataSet(data.map(v => v + 5))}>Update Data</button>
      <button onClick={() => dataSet(data.filter(v => v < 35))}>
        Filter Data
      </button>
    </>
  );
}

export default App;
