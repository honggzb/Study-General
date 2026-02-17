import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { formatPrice } from "@/utils/formatters";
import { ButtonLink } from "@/components/ButtonLink";

const Features = () => {
  const formattedPrice = formatPrice(110);

  return (
    <Bounded className="overflow-hidden bg-black py-16 text-white md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto,auto]">
            <FadeIn
                className="translate-y-16 opacity-0 lg:col-span-2 lg:row-span-2"
                vars={{ duration: 1 }}
                start="top 70%"
            >
                <img src="./cote-royale-og-image.png" alt="" className="h-auto w-full object-cover"/>
            </FadeIn>
            <FadeIn className="translate-y-16 space-y-6 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1">
                <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
                    Powerful Simplicity.
                </h2>
                <div className="max-w-lg text-base text-gray-300">
                    Magna quis id incididunt culpa non commodo quis. Aute aliqua eiusmod anim mollit do reprehenderit minim elit laborum exercitation. Esse ex sit adipisicing consequat.
                </div>
            </FadeIn>

            <FadeIn
                className="animate-in relative translate-y-16 self-end bg-white/10 opacity-0 will-change-transform"
                vars={{ duration: 1, delay: 1 }}
            >
                <img src="./" className="mx-auto h-[30px] -mt-10 w-full -rotate-12 md:-mt-20"/>
                <div className="flex justify-between p-10 pt-4">
                    <div className="space-y-1">
                    <h3 className="font-display text-4xl"></h3>
                    <p className="mt-2 text-gray-400">Eau de Parfum</p>
                    <ButtonLink href="#" variant="Secondary" className="mt-6" />
                    </div>
                    <p className="mt-4 text-gray-100" aria-label="Product price">
                    <span>{formattedPrice}</span>
                    </p>
                </div>
            </FadeIn>
        </div>
    </Bounded>
  )
}

export default Features