
import { Bounded } from '../Bounded';
import { ButtonLink } from '../ButtonLink';
import { Heading } from '../Heading';
import InteractiveSkateboard from './InteractiveSkateboard';
import { TallLogo } from './Talllogo'
import { WideLogo } from './WideLogo';

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

const Hero = () => {
  const deckTextureURL = DEFAULT_DECK_TEXTURE;
  const wheelTextureURL = DEFAULT_WHEEL_TEXTURE;
  const truckColor = DEFAULT_TRUCK_COLOR;
  const boltColor = DEFAULT_BOLT_COLOR;
  return (
    <Bounded className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture">
        <div className="absolute inset-0 flex items-center pt-20">
            <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
            <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
        </div>

      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 py-10">
        <Heading className="absolute text-6xl top-40 left-0">
          escape cul-de-sac
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="max-w-[45ch] font-bold text-xl">
            Not just a board, your board. Design a board that's as ral as the places you take it.
          </div>
          <ButtonLink
            icon="skateboard"
            color="purple"
            size="lg"
            className="z-20 mt-2"
          >
            Build Your Board
          </ButtonLink>
        </div>
      </div>

      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  )
}

export default Hero