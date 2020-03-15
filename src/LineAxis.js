import React from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear
} from "d3";

export default function LineAxis() {
  const [data, dataSet] = React.useState([25, 30, 45, 50, 20, 65, 75]);
  const svgRef = React.useRef();

  React.useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-1em")
      .attr("dy", "-.3em")
      .attr("transform", "rotate(-65)");

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    const myLine = line()
      .x((v, i) => xScale(i))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => dataSet(data.map(v => v + 5))}>Update Data</button>
      <button onClick={() => dataSet(data.filter(v => v < 35))}>
        Filter Data
      </button>
    </>
  );
}
