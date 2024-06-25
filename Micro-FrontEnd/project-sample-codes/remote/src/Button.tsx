//import { useState } from 'react'
import useCount from './store';

const Button = ()  => {
  //const [bcount, setState] = useState(0);
  const [bcount, setState] = useCount();
  return (
    <div className="card">
        <button onClick={() => setState((count) => count + 1)}>
          remote button: count is { bcount }
        </button>
    </div>
  )
}

export default Button
