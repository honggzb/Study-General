import SingleProduct from "@/components/single-product";

async function getProduct(productid: string) {
  const res = await fetch(`https://dummyjson.com/products/${productid}`);
  if (!res.ok) {
    throw new Error("could not get product data");
  }

  const data = await res.json();
  return data;
}

const ProductPage = async ({ params } : { params: Promise<{ productid: string }>}) => {
  const { productid } = await params;
  console.log("productid:", productid);

  const product =  await getProduct(productid);
  console.log(product);

  return (
    <div>
      <SingleProduct singleProductData={product} />
    </div>
  )
}

export default ProductPage