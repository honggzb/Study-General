import React from "react";
import Link from "next/link";
import Image from "next/image";

const SingleProductPage = ({ singleProductData}) => {
  return (
    <div className="m-4">
      <Link href={"/products"}>Go back to products</Link>
      <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full lg:stick top-0 sm:flex gap-2">
            <Image
              src={singleProductData?.images[0]}
              alt={singleProductData?.name || "Product Image"}
              width={"500"}
              height={"500"}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-950">
              {singleProductData?.name}
            </h2>
            <div className="gap-4 mt-5">
              <p className="text-2xl">{singleProductData?.title}</p>
            </div>
            <div className="mt-5">
              <p className="text-2xl">${singleProductData?.price}</p>
            </div>
            <div className="mt-5">
              <p className="text-lg">Description</p>
              <p>{singleProductData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage