
import { Bounded } from '../Bounded'
import { SlideIn } from '../SlideIn'
import { Heading } from '../Heading'
import { teams } from '../constant'
import Skater from './Skater'

const Team = () => {
  return (
    <Bounded className="bg-texture bg-brand-navy p-10">
        <SlideIn>
            <Heading as="h2" size="lg" className="mb-8 text-center text-white text-6xl uppercase">
                The Team
            </Heading>
      </SlideIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {teams.map((team, index) => {
          return (
            <div key={index}>
                <SlideIn>
                    <Skater key={index} {...team} />
                </SlideIn>
            </div>
          )
        })}
      </div>
    </Bounded>
  )
}

export default Team