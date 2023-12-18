import React, { useState } from 'react';
import './App.css';
import BarChart from "./BarChart";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);

  return (
    <React.Fragment>
      <BarChart data={data}></BarChart>
      <br/>
      <button onClick={() => setData(data.map( value => value + 5))}>Update Data</button>
      <br/>
      <button onClick={() => setData(data.filter( value => value < 35))}>Filter Data</button>
      <br/>
      <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>Add Data</button>
    </React.Fragment>
  );
}

export default App;
