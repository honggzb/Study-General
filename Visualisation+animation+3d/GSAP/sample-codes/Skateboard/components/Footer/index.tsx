import { NAVIGATION_LINK } from '../constant';
import Link from 'next/link';
import { Bounded } from '../Bounded';
import FooterPhysics from './FooterPhysics';

const Footer = () => {
  const boardTextureURLs = ["./skateboard/skateboard-white.avif", "./skateboard/skateboard-gray.avif", "./skateboard/skateboard-red.avif", "./skateboard/skateboard-black.png", "./skateboard/skateboard-white.avif", "./skateboard/skateboard-gray.avif"];

  return (
    <footer aria-labelledby="footer" className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto overflow-hidden">
        <img src="./footer-bg.avif" alt="" className="object-cover" />
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0"
        />
      </div>
        <Bounded as="nav">
          <ul className="flex flex-wrap justify-center gap-8 p-8 text-2xl">
            {NAVIGATION_LINK.map((item, index) => (
              <li key={item.name+index} className="hover:underline">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </Bounded>
    </footer>
  )
}

export default Footer

