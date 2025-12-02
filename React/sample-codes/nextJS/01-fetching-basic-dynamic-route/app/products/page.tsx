import ProductsList from '@/components/products-list';

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products');
  if(!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json()
  return data.products;
}

const ProductsPage = async () => {
  const products = await getProducts();
  //console.log(products);

  return (
    <div><ProductsList productsData={products} /></div>
  )
}

export default ProductsPage