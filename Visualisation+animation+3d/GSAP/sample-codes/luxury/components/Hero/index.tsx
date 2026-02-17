import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";
import Image from "next/image";

const Hero = () => {
  return (
    <Bounded className="relative min-h-screen overflow-hidden bg-neutral-950">
        <FadeIn
            vars={{ scale: 1, opacity: 0.5 }}
            className="absolute inset-0 opacity-0 motion-safe:scale-125"
        >
            <img src="./background.avif"  alt="" className="object-cover motion-reduce:opacity-40" />
        </FadeIn>
        <div className="relative flex h-screen flex-col justify-center">
            <RevealText
                    id="hero-heading"
                    description="Effortless Elegance"
                    as="h1"
                    className="mt-6 max-w-md translate-y-8 text-neutral-100 font-display text-6xl leading-none  md:text-7xl lg:text-8xl"
                    staggerAmount={0.3}
                    duration={1.7}
            />
            <FadeIn
                className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
                vars={{ delay: 1, duration: 1.3 }}
            >
                <p>Aute adipisicing aute excepteur consequat nisi cupidatat. Ad ad ad aliquip laboris aliqua. Ipsum labore tempor proident adipisicing ex. Fugiat esse cupidatat do ullamco aute magna consequat labore.</p>
            </FadeIn>
            <FadeIn
                className="mt-8 translate-y-5"
                vars={{ delay: 1.7, duration: 1.1 }}
                >
                <ButtonLink className="w-fit" variant="Secondary" />
            </FadeIn>
        </div>
    </Bounded>
  )
}

export default Hero