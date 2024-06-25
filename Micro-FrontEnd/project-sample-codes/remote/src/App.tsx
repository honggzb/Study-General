//import { useState } from 'react'
import Button from './Button'
import useCount from './store'

function App() {
  //const [count, setCount] = useState(0)
  const [count, setCount] = useCount()

  return (
    <div className='App'>
      <h1> Remote Application</h1>
      <Button />
      <br/>
      <div className="card">
        <h4> Remote Application</h4>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
