import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkProduct,
  deleteProduct,
  getProducts,
  Product,
  useCheckProductMutation,
  useDeleteProductMutation,
  useGetProducts,
} from "../repository/ProductRepository";
import SearchForm from "./SearchForm";

const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [checkAll, setCheckAll] = useState(false);

  const queryClient = useQueryClient();
  const productsQuery = useGetProducts(
    keyword,
    currentPage,
    pageSize,
    (response: any) => {
      const totalElements = response.headers["x-total-count"];
      let pages = Math.floor(totalElements / pageSize);
      if (totalElements % pageSize != 0) ++pages;
      setTotalPages(pages);
    }
  );
  const checkProductMutation = useCheckProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const handleSearchProducts = (e: Event) => {
    e.preventDefault();
    setKeyword(query);
    productsQuery.refetch();
  };
  const handleCheckAllProducts = (products: Product[]) => {
    setCheckAll(!checkAll);
    products.forEach((p: Product) => {
      checkProductMutation.mutate({ ...p, checked: checkAll });
    });
  };
  const handleDeleteCheckedProducts = (products: Product[]) => {
    products.forEach((p: Product) => {
      if (p.checked) deleteProductMutation.mutate(p);
    });
  };

if (productsQuery.isLoading) {
    return <h1>Loading ...</h1>;
  } else if (productsQuery.isError) {
    return <h1>Error</h1>;
  } else {
    return (
      <div className="p-3">
        <div className="card">
          <div className="card-body">
            <SearchForm
              query={query}
              handleSearchProducts={handleSearchProducts}
              setQuery={setQuery}
            ></SearchForm>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>
                    <button
                      onClick={(e) =>
                        handleCheckAllProducts(productsQuery.data?.data)
                      }
                      className="btn btn-outline-success"
                    >
                      <FontAwesomeIcon
                        icon={checkAll ? faCircle : faCheckCircle}
                      ></FontAwesomeIcon>
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={(e) =>
                        handleDeleteCheckedProducts(productsQuery.data?.data)
                      }
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsQuery.data?.data?.map((p) => (
                  <ProductItem
                    product={p}
                    checkProductMutation={checkProductMutation}
                    deleteProductMutation={deleteProductMutation}
                    navigate={navigate}
                  ></ProductItem>
                ))}
              </tbody>
            </table>
            <PagesNav
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></PagesNav>
          </div>
        </div>
      </div>
    );
  }
}

export default Products