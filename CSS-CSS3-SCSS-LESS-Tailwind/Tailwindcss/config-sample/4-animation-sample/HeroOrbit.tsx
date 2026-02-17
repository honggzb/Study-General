import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    size: number;
    rotation: number;
    orbitDuration?: string;
    shouldOrbit?: boolean;
    shouldSpin?: boolean;
    spinDuration?: number;
}

const HeroOrbit = ({ children, size, rotation, orbitDuration, shouldOrbit = false, shouldSpin = true, spinDuration = 10 }: Props) => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
            <div
                className={clsx(shouldOrbit && "animate-spin")}
                style={{ animationDuration: `${orbitDuration}s`}}
            >
                <div className="flex items-start justify-start"
                    style={{
                        height: `${size}px`,
                        width: `${size}px`,
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    <div
                        className={clsx(shouldSpin && "animate-spin")}
                        style={{ animationDuration: `${spinDuration}s`}}
                    >
                        <div className="inline-flex"
                            style={{ transform: `rotate(${rotation *-1}deg)`}}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroOrbit

/**
 *
 */

{/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="border border-red-500 size-[800px] animate-spin [animation-duration:30s]">
        <div className="inline-flex border border-red-500 animate-spin [animation-duration:5s]">
            <Image src={StarIcon} alt="Star icon" className="size-28" />
            or <StarIcon className="size-28 text-emerald-300" />
        </div>
    </div>
</div> */}
