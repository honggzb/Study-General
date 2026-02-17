import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";
import { Bounded } from "@/components/Bounded";

const Action = () => {
  return (
    <Bounded className="relative overflow-hidden bg-[url('/background.avif')] bg-cover bg-center py-16 text-gray-50 md:py-28">
        <FadeIn
          className="translate-y-2 text-sm font-light tracking-[.2em] uppercase text-center mb-4"
          vars={{ duration: 0.8 }}
        >
          Fragrance Quiz
        </FadeIn>
        <RevealText
          id="cta-heading"
          description={"The cote Royale Fragrance Quiz"}
          as="h2"
          className="font-display mx-auto max-w-3xl text-5xl sm:text-6xl md:text-7xl"
          align="center"
          staggerAmount={0.1}
          duration={0.8}
        />
        <FadeIn
          className="mx-auto max-w-2xl translate-y-2 text-lg text-balance text-gray-300"
          vars={{ duration: 0.8, delay: 0.4 }}
        >
          Find your perfect scent match with our fragrance quiz. Answer a few simple questions about your preferences and personality, and we'll recommend the ideal fragrance that suits you best.
        </FadeIn>
        <div className="mt-10 text-center">
            <FadeIn>
              <ButtonLink title={"TAKE THE QUIZ"} href={"#"} />
            </FadeIn>
        </div>
    </Bounded>
  )
}

export default Action