import React from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import ResizeObserver from "resize-observer-polyfill"; // for safari and edge

const useResizeObserver = ref => {
  const [dimensions, dimensionsSet] = React.useState(null);
  React.useEffect(() => {
    const observerTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      dimensionsSet({ width, height: width / 2 });
    });
    resizeObserver.observe(observerTarget);
    return () => resizeObserver.unobserve(observerTarget);
  }, [ref]);
  return dimensions;
};

const initialData = [25, 30, 45, 50, 20, 65, 75];

export default function BarResponsive() {
  const [data, dataSet] = React.useState(initialData);
  const svgRef = React.useRef();
  const wrapperRef = React.useRef();
  const dimensions = useResizeObserver(wrapperRef);

  React.useEffect(() => {
    if (dimensions === null) return;
    const { width, height } = dimensions;
    svgRef.current.style.height = `${height}px`;
    wrapperRef.current.style.height = `${height}px`;
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["blue", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${width}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", "scale(1,-1)")
      .attr("x", (_, i) => xScale(i))
      .attr("y", -height)
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
      .attr("height", v => height - yScale(v));
  }, [data, dimensions]);

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef} className="svg">
          {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <button onClick={() => dataSet(data.map(v => v + 5))}>+</button>
      <button onClick={() => dataSet(data.map(v => v - 5))}>-</button>
      <button
        onClick={() => dataSet([...data, Math.round(Math.random() * 130) + 10])}
      >
        Addd data
      </button>
      <button onClick={() => dataSet(data.filter(v => v < 35))}>Filter</button>
      <button onClick={() => dataSet(initialData)}>Reset</button>
    </>
  );
}
