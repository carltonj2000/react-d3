import React from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

import "./App.css";

import Basics from "./Basics";
import LineAxis from "./LineAxis";
import BarColorAnimation from "./BarColorAnimation";
import BarInteractive from "./BarInteractive";

const Break = () => <hr style={{ marginTop: "20px" }} />;

const initialData = [25, 30, 45, 50, 20, 65, 75];

function App() {
  const [data, dataSet] = React.useState(initialData);
  const svgRef = React.useRef();

  React.useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["blue", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", "scale(1,-1)")
      .attr("x", (_, i) => xScale(i))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (v, i) => {
        svg
          .selectAll(".tooltip")
          .data([v])
          .join(enter => enter.append("text").attr("y", yScale(v) - 4))
          .text(v)
          .attr("x", xScale(i) + xScale.bandwidth() / 2)
          .attr("class", "tooltip")
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(v) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", v => v);
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => dataSet(data.map(v => v + 5))}>+</button>
      <button onClick={() => dataSet(data.map(v => v - 5))}>-</button>
      <button onClick={() => dataSet(data.filter(v => v < 35))}>Filter</button>
      <button onClick={() => dataSet(initialData)}>Reset</button>
      <Break />
      <BarInteractive />
      <Break />
      <BarColorAnimation />
      <Break />
      <LineAxis />
      <Break />
      <Basics />
      <Break />
    </>
  );
}

export default App;
