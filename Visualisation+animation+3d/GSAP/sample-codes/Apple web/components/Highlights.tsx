import React from 'react'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc-800">
      <div className="w-screen">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link text-white">
              Watch the film
              <img src="/assets/images/watch.svg" alt="watch" className="ml-2" />
            </p>
            <p className="link text-white">
              Watch the event
              <img src="/assets/images/right.svg" alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights