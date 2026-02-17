
import { Bounded } from '../Bounded'
import { SlideIn } from '../SlideIn'
import { Heading } from '../Heading'
import { products } from '../constant'
import SkateboardProduct from './SkateboardProduct'

const Product = () => {
  return (
    <Bounded className="bg-texture bg-brand-gray">
        <SlideIn>
            <Heading className="text-center mb-4 text-6xl font-extrabold uppercase pt-5" as="h2">
                latest drop
            </Heading>
        </SlideIn>
        <SlideIn>
        <div className="text-center text-2xl mb-6 font-bold">
          Grab our freshest designs before they sell out.
        </div>
      </SlideIn>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => {
          return (
            <SkateboardProduct {...product} key={index} />
          )
        })}
      </div>
    </Bounded>
  )
}

export default Product