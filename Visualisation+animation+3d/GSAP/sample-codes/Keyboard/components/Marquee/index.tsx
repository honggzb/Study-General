import { Cherry } from 'lucide-react';
import { Fragment } from "react";
import clsx from "clsx";

const phrases: string[] = [
    "marquee 1",
    "marquee 2",
    "marquee 3",
    "marquee 4",
    "marquee 5",
];

const MarqueeContent = () => (
    <div className="flex items-center bg-gray-200 py-10 whitespace-nowrap">
      {phrases.map((item, i) => (
        <Fragment key={i}>
          <div className="font-bold-slanted px-14 text-[180px] leading-none text-gray-400/80 uppercase [text-box:trim-both_cap_alphabetic] md:text-[260px]">
            {item}
          </div>
          <Cherry className="size-36 flex-shrink-0" />
        </Fragment>
      ))}
    </div>
  );

const Marquee = ({direction}: {direction: string}) => {

  return (
    <div
        className="relative flex w-full items-center overflow-hidden select-none"
        aria-hidden="true"
        role="presentation"
      >
        <div className="relative flex items-center whitespace-nowrap">
          <div
            className={clsx(
              "marquee-track animate-marquee flex",
              direction === "Right" && "[animation-direction:reverse]",
            )}
          >
            {/* Content to duplicate */}
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
  )
}

export default Marquee