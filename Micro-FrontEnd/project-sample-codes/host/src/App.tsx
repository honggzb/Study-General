//import { useState } from 'react'

import Button from "remoteApp/Button";
import useStore from "remoteApp/store";

function App() {
  // const [count, setCount] = useState(0)
  const [count, setCount] = useStore()
  return (
    <div className="App">
      <h1>Host Application</h1>
      <Button />
      <br/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
