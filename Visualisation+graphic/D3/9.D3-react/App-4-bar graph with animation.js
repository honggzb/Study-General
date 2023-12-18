import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';

function App() {
  const [data, setData] = useState([25,30,45,60,20,65,76]);
  const svgRef = useRef();
  // will be called initially an on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
                    .domain(data.map((value, index) => index))
                    .range([0, 300])
                    .padding(0.5);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
    //const colorScale = scaleLinear().domain([0, 150]).range(["green", "red"]);
    const colorScale = scaleLinear().domain([75,100,150]).range(["green", "orange", "red"]).clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis")
       .style("transform","translateY(150px)")
       .call(xAxis);
    
    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
       .style("transform","translateX(300px)")
       .call(yAxis);
    
    // renders path element, and attaches
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", colorScale)
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", value => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className='x-axis'></g>
        <g className='y-axis'></g>
      </svg>
      <br/>
      <br/>
      <br/>
      <button onClick={() => setData(data.map( value => value + 5))}>Update Data</button>
      <br/>
      <button onClick={() => setData(data.filter( value => value < 35))}>Filter Data</button>
    </React.Fragment>
  );
}

export default App;
