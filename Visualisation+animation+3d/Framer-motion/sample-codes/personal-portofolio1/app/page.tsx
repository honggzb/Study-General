import Photos from "@/components/Photos";
import Social from "@/components/Social";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Stats from "@/components/Stats";

/**
 * https://www.youtube.com/watch?v=dImgZ_AH7uA
 * 1. between page animation
 * 2. circle around image animation
 * 3. number change animation- react-countup
 */

export default function Home() {
  return (
    <section className="overflow-x-hidden w-full h-full text-white">
      <div className="mx-auto m-4">
        <div className="flex flex-col xl:flex-row items-center justify-center xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-0">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1">Hello, I'am<br />xxx xxxxx</h1>
            <p className="max-w-[500px] mb-9 text-white/80">Magna eu magna id amet. Amet magna Lorem aliquip dolor aliquip ad esse Lorem ex nisi anim ipsum dolore eiusmod veniam anim quis.</p>
            <div className="flex flex-col xl:flex-row items-center justify-center">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <span>Download CV</span>
                <Download />
              </Button>
              <div className="m-8 xl:mb-0">
                <Social containerstyles="flex gap-6" iconStyles="w-9 h-9 border border-[#c5ff9cf7] rounded-full flex items-center justify-center text-[#c5ff9cf7] text-base hover:bg-[#c5ff9cf7] hover:text-[#122902f7] hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-0 mb-8">
            <Photos />
          </div>
        </div>
      </div>
      <Stats />
    </section>

  );
}
