import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, line, curveCardinal } from 'd3';

function App() {
  const [data, setData] = useState([25,30, 45,60,20]);
  const svgRef = useRef();
  // will be called initially an on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
                    .x((value, index) => index * 50)
                    .y(value => value)
                    .curve(curveCardinal);
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value *2)
    //   .attr("cy", value => value *2)
    //   .attr("stroke", "red");
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        {/* <path d="M0,150 100, 100 150, 120" stroke="blue" fill="none" /> */}
      </svg>
      <br/>
      <button onClick={() => setData(data.map( value => value + 5))}>Update Data</button>
      <button onClick={() => setData(data.filter( value => value < 35))}>Filter Data</button>
    </React.Fragment>
  );
}

export default App;
