import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';

function App() {
  const [data, setData] = useState([25,30,45,60,20,65,76]);
  const svgRef = useRef();
  // will be called initially an on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    
    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
    
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
    svg.select(".x-axis")
       .style("transform","translateY(150px)")
       .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
       .style("transform","translateX(300px)")
       .call(yAxis);
    
    const myLine = line()
                    .x((value, index) => xScale(index))
                    .y(yScale)
                    .curve(curveCardinal);
    // renders path element, and attaches
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
