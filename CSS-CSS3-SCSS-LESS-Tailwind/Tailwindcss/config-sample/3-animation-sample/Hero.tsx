import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import memojiImage from "@/public/images/memoji-smile.png";
import gainImage from "@/public/images/grain.jpg";
import StarIcon from "@/public/icons/star.svg";
import SparkeIcon from "@/public/icons/sparkle.svg";
import HeroOrbit from "./HeroOrbit";

const Hero = () => {
  return (
    <div className="py-30 md:py-48 lg:py-60 relative z-0">
        <div className="absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
            <div
                className="absolute inset-0 -z-30 opacity-5"
                style={{ backgroundImage: `url(${gainImage.src})`}}
            ></div>
            {/* background ring */}
            <div className="size-[620px] hero-ring"></div>
            <div className="size-[820px] hero-ring"></div>
            <div className="size-[1020px] hero-ring"></div>
            <div className="size-[1220px] hero-ring"></div>
            <HeroOrbit size={600} rotation={-70} shouldOrbit={true} orbitDuration="34">
                <Image src={StarIcon} alt="Star icon" className="size-28" />
                {/* <StarIcon className="size-28 text-emerald-300" /> */}
            </HeroOrbit>
            <HeroOrbit size={550} rotation={20} shouldOrbit={true} orbitDuration="30">
                <Image src={StarIcon} alt="Star icon" className="size-12" />
            </HeroOrbit>
            <HeroOrbit size={459} rotation={98} shouldOrbit={true} orbitDuration="40">
                <Image src={StarIcon} alt="Star icon" className="size-8" />
            </HeroOrbit>
            <HeroOrbit size={330} rotation={-15}>
                <Image src={SparkeIcon} alt="Sparkle icon" className="size-8" />
            </HeroOrbit>
            <HeroOrbit size={340} rotation={79}>
                <Image src={SparkeIcon} alt="Sparkle icon" className="size-8" />
            </HeroOrbit>
            <HeroOrbit size={450} rotation={178}>
                <Image src={SparkeIcon} alt="Sparkle icon" className="size-10" />
            </HeroOrbit>
            <HeroOrbit size={640} rotation={150}>
                <Image src={SparkeIcon} alt="Sparkle icon" className="size-14" />
            </HeroOrbit>
            <HeroOrbit size={620} rotation={85}>
            <div className="size-3 rounded-full bg-emerald-300/20"></div>
            </HeroOrbit>
            <HeroOrbit size={420} rotation={-41}>
            <div className="size-2 rounded-full bg-emerald-300/20"></div>
            </HeroOrbit>
        </div>
        <div className="container mx-auto">
            <div className="flex flex-col justify-center items-center">
                <Image src={memojiImage} alt="Person peeking from behind laptop" className="size-[100px] object-cover" />
                <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-3 rounded-lg">
                    <div className="bg-green-500 size-2.5 rounded-full relative">
                        <div className="absolute bg-green-500 inset-0 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-sm font-medium">Available for new projects</div>
                </div>
            </div>
            <div className="max-w-lg mx-auto">
                <h1 className="font-serif text-3xl text-center mt-8 tracking-wide">Building Exceptional User Experiences</h1>
                <p className="mt-4 text-center text-white/60 md:text-lg">We specialize in creating innovative and engaging digital solutions that captivate users and drive results.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
                <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-full">
                    <span className="font-semibold">Explore My work</span><ArrowDownIcon />
                </button>
                <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 px-6 h-12 rounded-full">
                    <span>🖐️</span>
                    <span className="font-semibold">Let's connect</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Hero
