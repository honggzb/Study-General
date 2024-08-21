
import React from 'react'
import SingleProductList from '@/components/single-product-list';

async function getProduct(productid) {
  const res = await fetch(`https://dummyjson.com/products/${productid}`)
  if(!res.ok) throw new Error('could ot get product');
  const data = await res.json();
  return data;
}


 const SingleProductPage = async ({ params }) => {
  const data = await getProduct(params?.productid);
  console.log('product', data)
  return (
    <SingleProductList singleProductData={data} />
  )
}

export default SingleProductPage