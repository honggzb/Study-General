//https://github.com/mohamedYoussfi/react-query-json-server-crud-refactor/

import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface Product {
  id:      number;
  name:    string;
  price:   number | string;
  checked: boolean | string;
}

export const productApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = (keyword: string, page: number, size: number) => {
  return productApi.get(
    `/products?name_like=${keyword}&_page=${page}&_limit=${size}`
  );
};
export const getProductById = (id: string) => {
  return productApi.get("/products/" + id);
};
export const checkProduct = (product: Product) => {
  return productApi.patch(`/products/${product.id}`, {
    checked: product.checked,
  });
};

export const updateProduct = (product: Product) => {
  return productApi.patch(`/products/${product.id}`, product);
};

export const deleteProduct = (product: Product) => {
  return productApi.delete(`/products/${product.id}`);
};

export const addProduct = (product: Product) => {
  return productApi.post(`/products`, product);
};

export const useGetProducts = (keyword: string, currentPage: number, pageSize: number, onSuccess: boolean) => {
  return useQuery(
    ["products", keyword, currentPage, pageSize],
    () => getProducts(keyword, currentPage, pageSize),
    {
      enabled: true,
      onSuccess: onSuccess,
    }
  );
};

export const useCheckProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(checkProduct, {
    onSuccess: (_, data) => {
      //queryClient.invalidateQueries("products") //allProductsQuery.refetch(),
      queryClient.setQueriesData("products", (oldQueryData) => {
        const newData = oldQueryData.data.map((p) => {
          if (p.id == data.id) return { ...p, checked: !p.checked };
          else return p;
        });
        return {
          ...oldQueryData,
          data: newData,
        };
      });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"),
  });
};

export const useNewProductMutation = () => {
  return useMutation(addProduct, {
    onSuccess: () => {},
  });
};

export const useGetProductByIdQuery = (id: string, setName: any, setPrice: any, setChecked: any) => {
  return useQuery(["product", id], () => getProductById(id), {
    onSuccess: (response) => {
      setName(response.data.name);
      setPrice(response.data.price);
      setChecked(response.data.checked);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation(updateProduct, {
    onSuccess: () => {},
  });
};