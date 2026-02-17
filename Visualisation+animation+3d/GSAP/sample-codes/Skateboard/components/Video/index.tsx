import React from 'react'
import { Bounded } from '../Bounded'
import LazyYouTubePlayer from './LazyYouTubePlayer';
import clsx from 'clsx';

const MASK_CLASSES = "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";


const Video = () => {
  return (
    <Bounded className='bg-texture bg-zinc-900 p-6'>
        <h2 className="sr-only">Video Reel</h2>
        <div className="relative aspect-video">
            {/* Masks */}
            <div className={clsx(MASK_CLASSES, "bg-[rgb(217, 241, 84)] absolute inset-0 ~translate-x-2/3 ~translate-y-2/3")} />
            <div className={clsx(MASK_CLASSES, "bg-white absolute inset-0 ~translate-x-1/3 ~translate-y-1/2")} />
            <div className={clsx(MASK_CLASSES, "bg-white absolute inset-0 ~translate-x-1/2 ~-translate-y-1/3")} />
            {/* Video */}
            <div className={clsx(MASK_CLASSES, "relative h-full")}>
                <LazyYouTubePlayer youTubeID={"44I29krtxaw"} />
                {/* Texture overlay */}
                <img src="./image-texture.png" alt="" className="pointer-events-none object-cover opacity-50" />
            </div>
        </div>
    </Bounded>
  )
}

export default Video