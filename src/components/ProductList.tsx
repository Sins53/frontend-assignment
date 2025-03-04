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
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts(page, limit);
        setData(response);
        setTotalPages(Math.ceil(response.total / limit));
      } catch (err) {
        alert("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

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
        <h2 className="text-2xl">Product List</h2>
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
          <div className="mt-4 flex-shrink-0">
            <div className="flex flex-col md:flex-row md:justify-between lg:flex-col items-center mb-4">
              <div className="flex items-center">
                <span className="mr-2">Showing</span>
                <select
                  className="text-primary bg-surface p-1 rounded"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {[10, 20, 30, 40, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span className="mx-2">rows out of</span>
                <span>{data?.total || 0} results</span>
              </div>
              <CustomPagination
                totalPages={totalPages}
                currentPage={page}
                gotoPage={gotoPage}
                goPrevious={goPrevious}
                goNext={goNext}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
