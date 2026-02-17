import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import PerfumeAttributes from "./PerfumeAttributes";

type scentProfileType = "spicy" | "woody" | "fresh";
type moodProfileType = "bold" | "grounded" | "refreshing";

type FragDisplayProps = {
    name: string;
    subtitle: string;
    description: string;
    imageUrl?: string;
    scentProfile: scentProfileType;
    mood: moodProfileType;
}

const FragDisplay = ({ name, subtitle, description, imageUrl, scentProfile, mood}: FragDisplayProps) => {
    return (
        <FadeIn
            className="relative z-10 grid min-h-[85vh] w-full translate-y-20 items-center justify-items-start border border-white/10 p-4 text-left md:p-14 lg:p-20"
            vars={{ duration: 2.5 }}
            start="top 50%"
        >
            <div className="absolute inset-0 z-0">
                <img src={imageUrl} alt="" className="object-cover opacity-40 md:opacity-100" />
            </div>
            <FadeIn
                className="relative z-10 grid translate-y-8 text-fuchsia-950"
                vars={{ duration: 3, delay: 0.8 }}
                start="top 50%"
            >
                <h3 className="font-display mb-3 text-5xl md:text-6xl lg:text-7xl text-fuchsia-950">
                    {name}
                </h3>
                <p className="mb-8 text-base font-semibold text-fuchsia-950">
                    {subtitle}
                </p>
                <div className="mb-10 max-w-md text-lg text-fuchsia-950">
                    <p>{description}</p>
                </div>
                <PerfumeAttributes
                    scentProfile={scentProfile}
                    mood={mood}
                    className="mb-10 font-bold"
                />
                <div className="flex flex-wrap gap-4">
                    <ButtonLink title={"Discover"} variant="Secondary"/>
                    <ButtonLink href="#" title="Add to bag" variant="Primary" />
                        {/* <PlusIcon className="mr-2" />
                    </ButtonLink> */}
                </div>
            </FadeIn>
        </FadeIn>
    )
}

export default FragDisplay;