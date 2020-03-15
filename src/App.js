import React from "react";
import { select } from "d3";

import "./App.css";

function App() {
  const [data, dataSet] = React.useState([25, 30, 45, 50, 20]);
  const svgRef = React.useRef();

  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", v => v)
      .attr("cx", v => v * 2)
      .attr("cy", v => v * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <hr />
      <button onClick={() => dataSet(data.map(v => v + 5))}>Update Data</button>
      <button onClick={() => dataSet(data.filter(v => v < 35))}>
        Filter Data
      </button>
    </>
  );
}

export default App;
