import clsx from "clsx";
import { Bounded } from '../Bounded'
import { SlideIn } from '../SlideIn'
import { Heading } from '../Heading'
import { ButtonLink } from '../ButtonLink'
import ParallaxImage from "./ParallaxImage";
import { textAndImages } from "../constant";

// for parallax effect
declare module "react" {
  interface CSSProperties {
    "--topNumber"?: number;
  }
}

type TextAndImageItemProps = {
    topIndex: number;
    theme: string;
    backgroundImage: string;
    foregroundImage: string;
    imageOnLeft: boolean;
    heading: string;
    description: string;
}

const TextAndImage = () => {
  return (
    <Bounded className='bg-texture bg-zinc-900 gap-6'>
        {textAndImages.map((tt, index) => {
            return (
                <TextAndImageItem key={index} {...tt} />
            )
        })}
    </Bounded>
  )
}

export default TextAndImage;

const TextAndImageItem = ({topIndex, theme, foregroundImage, backgroundImage, imageOnLeft, heading, description }: TextAndImageItemProps) => {
    return (
        <div className={clsx(
            "sticky top-[calc(var(--topNumber)*2rem)] gap-12 p-12 md:gap-24 bg-texture",
            theme === "Blue" && "bg-brand-blue text-white",
            theme === "Orange" && "bg-brand-orange text-white",
            theme === "Navy" && "bg-brand-navy text-white",
            theme === "Lime" && "bg-brand-lime"
            )}
            // using 'sticky' and vairable '--topNumber' to finish parallax effect
            style={{ "--topNumber": topIndex }}
        >
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div className={clsx(
                    "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
                    imageOnLeft && "md:order-2"
                )}>
                    <SlideIn>
                        <Heading size="lg" className="text-4xl font-extrabold" as="h2">
                            {heading}
                        </Heading>
                    </SlideIn>
                    <SlideIn>
                        <div className="max-w-md text-lg leading-relaxed mt-4">
                            <p>{description}</p>
                        </div>
                    </SlideIn>
                    <SlideIn>
                        <ButtonLink color={theme === "Lime" ? "orange" : "lime"} size="lg" className="mt-8">
                            Shop Boards
                        </ButtonLink>
                    </SlideIn>
                </div>
                <ParallaxImage foregroundImage={foregroundImage} backgroundImage={backgroundImage} />
            </div>
        </div>
    )
}