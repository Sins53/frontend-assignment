import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { ProductsResponse } from "../types/types";
import CustomPagination from "./CustomPagination";
import ProductListCard from "./ProductListCard";
import Spinner from "./Spinner";

const ProductList: React.FC = () => {
  const [data, setData] = useState<ProductsResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts(page);
        setData(response);
        setTotalPages(Math.ceil(response.total / 10));
      } catch (err) {
        alert("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const gotoPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const goPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goNext = () => {
    setPage((nextPage) => Math.min(nextPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <h2>Product List</h2>
        <div className="flex-1 border-b-2 border-white" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col flex-grow min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 p-3 flex-grow overflow-y-auto">
            {data?.products?.map((item) => (
              <ProductListCard key={item?.id} productDetails={item} />
            ))}
          </div>
          <div className="mt-auto flex-shrink-0">
            <CustomPagination
              totalPages={totalPages}
              currentPage={page}
              gotoPage={gotoPage}
              goPrevious={goPrevious}
              goNext={goNext}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
