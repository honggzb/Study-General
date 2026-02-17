import { RevealText } from "@/components/RevealText";
import { Bounded } from "@/components/Bounded";
import FragDisplay from "./FragDisplay";
import { FRAGRANCES_LIST } from "../constant";

const FragList = () => {
    return (
        <Bounded className="space-y-8 bg-black py-16 text-center text-white md:py-24">
            <div className="mx-auto space-y-8">
                <p className="text-sm font-light tracking-[0.2em] uppercase">Our fragrances</p>
                 <RevealText
                    id="fagrances-description"
                    description={"AN ESSENGE FOR EVERY MAN."}
                    as="h2"
                    align="center"
                    duration={1.5}
                    staggerAmount={0.3}
                    className="font-display text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl"
                />
                <div className="mx-auto max-w-2xl text-lg text-balance text-gray-300">
                    An expression of quiet luxury, our fragrances are crafted with the finest ingredients to create a scent that is both captivating and refined.
                </div>
                <div className="mt-12 grid grid-cols-1 gap-12">
                    {FRAGRANCES_LIST.map((frag, index) => {
                      return (
                        <FragDisplay key={index} name={frag.name} subtitle={frag.subtitle} description={frag.description} imageUrl={frag.imageUrl} scentProfile={frag.scentProfile} mood={frag.mood} />
                      )
                    })}
                    {/* <FragDisplay name="Noir Intense" subtitle="Eau de Parfum" description={"A bold and captivating fragrance that embodies the essence of mystery and allure. With its rich blend of spicy and smoky notes, it creates an irresistible aura that lingers in the air, leaving a lasting impression."} scentProfile={"spicy"} mood={"grounded"} /> */}
                </div>
            </div>
        </Bounded>
    )
}

export default FragList;