import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { ProductsResponse } from "../types/types";
import ProductListCard from "./ProductListCard";
import Spinner from "./Spinner";

const ProductList: React.FC = () => {
  const [data, setData] = useState<ProductsResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setData(response);
      } catch (err) {
        alert("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2">
        <h2>Product List</h2>
        <div className="flex-1 border-b-2 border-white" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4 p-3">
          {data?.products?.map((item) => (
            <ProductListCard key={item?.id} productDetails={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
