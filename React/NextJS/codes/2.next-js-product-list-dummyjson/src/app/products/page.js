
import ProductList from '@/components/products-list';
import React from 'react'

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products');
  if(!res.ok) {
    throw new Error('Could not get products data')
  }
  const data = await res.json();
  return data.products;
}

const ProductPage = async () => {
  const data = await getProducts();
  console.log('data', data)
  return (
    <ProductList productsData={data} />
  )
}

export default ProductPage