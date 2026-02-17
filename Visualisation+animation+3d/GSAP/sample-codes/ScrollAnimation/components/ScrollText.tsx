import React from 'react'

const ScrollText = () => {
  return (
    <div className='bg-white text-center text-[min(5vw, 86px)] w-screen'>
      <h1 className='absolute to-[50vh] left-[50vw] translate-x-[-50%] text-white m-0 whitespace-nowrap text-9xl'>
        {`R3F Scrollproject`}
      </h1>
      <h1 className='absolute top-[120vh] left-[50vw] translate-x-[-50%] text-[#f4b677] m-0 text-9xl'>
        {`I love to create Web experiences`}
      </h1>
      <h1 className='absolute top-[200vh] left-[50vw] translate-x-[-50%] text-[#673ab7] m-0 whitespace-nowrap text-9xl'>
        {`Let´s scroll!`}
      </h1>
    </div>
  )
}

export default ScrollText