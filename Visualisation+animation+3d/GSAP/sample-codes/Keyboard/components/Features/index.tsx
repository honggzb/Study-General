import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";

const features = [
    {
        size: "Large",
        image: "/render_6.png",
        desc: "Full aluminum case.",
        text: "Premium materials for satisfying heft and durability.",
    },
    {
        size: "Small",
        image: "/render_5_angled.png",
        desc: "Interchangable knob.",
        text: "Premium materials for satisfying heft and durability.",
    },
    {
        size: "Small",
        image: "/render_1.png",
        desc: "Cross Platform.",
        text: "Premium materials for satisfying heft and durability.",
    },
    {
        size: "Large",
        image: "/render_9.png",
        desc: "Hot-Swappable Switches.",
        text: "Premium materials for satisfying heft and durability.",
    },
];

type FeaturesItemProps = {
    size?: string;
    image: string;
    desc: string;
    text: string;
}

function FeaturesItem({ feature }) {
  return (
        <div
        className={clsx(
            "overflow-hidden rounded-3xl",
            feature.size === "Small" && "md:col-span-2",
            feature.size === "Medium" && "md:row-span-3",
            feature.size === "Large" && "md:col-span-4",
        )}
        >
        <img
            src={feature.image}
            className="h-full w-full object-cover"
            alt="Features"
            quality={96}
            height={500}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-line-to-b from-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
            <p><span className="font-bold">{feature.text}</span>{feature.desc}</p>
        </div>
    </div>
  );
}

const Features = () => {
  return (
     <Bounded>
      <FadeIn>
        <h2 id="keyboard-features" className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl">
          Vapor75 features
        </h2>
      </FadeIn>
      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {features.map((item, index) => (
          <FeaturesItem key={index} feature={item} />
        ))}
      </FadeIn>
    </Bounded>
  )
}

export default Features