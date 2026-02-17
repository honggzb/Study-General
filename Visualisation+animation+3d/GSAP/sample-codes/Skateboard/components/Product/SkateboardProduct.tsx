import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import clsx from "clsx";
import { Scribble } from "./Scribble";
import { StarIcon } from "lucide-react";

const VERTICAL_LINE_CLASSES = "absolute top-0 h-full stroke-2 fill-stone-100 transition-colors group-hover:fill-stone-400";
const HORIZONTAL_LINE_CLASSES = "-mx-8 stroke-2 fill-stone-100 transition-colors group-hover:fill-stone-400";

type props = {
  price: number;
  color: string;
  rank: number;
  imageUrl: string;
  productName: string;
}

const SkateboardProduct = async ({price, color, rank, imageUrl, productName}: props) => {
  const price1 = price
    ? (price / 100).toFixed(2).toString()
    : "Price Not Available";
  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4">
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
        <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

        <div className="flex items-center justify-between text-xl font-bold">
            <span>{price1}$</span>
                <span className="inline-flex items-center gap-1">
                <StarIcon className="text-yellow-400" /> {rank}
            </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble className="absolute inset-0 h-full w-full" color={color} />
        <img alt="" src={imageUrl} width={150}
          className=" mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150" />
      </div>

      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

       <h3 className="my-2 text-center font-sans leading-tight text-lg font-bold uppercase">
        {productName}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink href="#">Customize</ButtonLink>
      </div>
    </div>
  )
}

export default SkateboardProduct;
