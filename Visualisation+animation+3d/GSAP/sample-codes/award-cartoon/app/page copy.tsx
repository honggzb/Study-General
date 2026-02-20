import Image from "next/image";
import { useGSAP } from '@gsap/react';

/**
 * https://www.youtube.com/watch?v=uZz4gaBSt7E
 * Smooth Zoom-Out Scroll Parallax with GSAP ScrollTrigger | Awwwards Tutorial
 */

const IMAGES_CONFIG = {
  top: [
    {
      src: '/pictureB.webp',
      type: 'side',
      position: 'left-1/2',
    },
    {
      src: '/picture6.webp',
      type: 'side',
      position: 'right-1/2',
    },
  ],
  center: [
    {
      src: '/picture2.webp',
      type: 'side',
      position: 'right-full',
    },
    {
      src: '/picture1.webp',
      type: 'main',
      position: '',
    },
    {
      src: '/picture3.webp',
      type: 'side',
      position: 'left-full',
    },
  ],
  bottom: [
    {
      src: '/picture7.webp',
      type: 'side',
      position: 'left-1/2',
    },
    {
      src: '/picture5.webp',
      type: 'side',
      position: 'right-1/2',
    },
  ]
}

export default function Home() {
  return (
    <main>
      <section className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div data-scale className="relative h-screen w-screen will-change-transform">
            <div data-section='top' className="absolute bottom-full h-screen w-screen">
              {IMAGES_CONFIG.top.map((img, index) => {
                return (
                  <div key={'top-'+index} className={`absolute aspect-video h-screen w-screen ${img.position}`}>
                    <Image
                      data-zoom-type={img.type}
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 1080px, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                )
              })}
            </div>
            <div data-section='center'>
              {IMAGES_CONFIG.center.map((img, index) => {
                return (
                  <div key={'center-'+index} className={`absolute aspect-video h-screen w-screen ${img.position}`}>
                    <Image
                      data-zoom-type={img.type}
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 1080px, 100vw"
                      className="object-cover"
                      priority={img.type === 'main'}
                    />
                  </div>
                )
              })}
            </div>
            <div data-section='bottom' className="absolute bottom-full h-screen w-screen">
              {IMAGES_CONFIG.bottom.map((img, index) => {
                return (
                  <div key={'bottom-'+index} className={`absolute aspect-video h-screen w-screen ${img.position}`}>
                    <Image
                      data-zoom-type={img.type}
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 1080px, 100vw"
                      className="object-cover"
                      priority={img.type === 'main'}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
