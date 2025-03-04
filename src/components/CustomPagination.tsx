import React from "react";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  gotoPage: (page: number) => void;
  goPrevious: () => void;
  goNext: () => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  gotoPage,
  goPrevious,
  goNext,
}) => {
  const filterPages = (
    visiblePages: (number | string)[],
    totalPages: number
  ) => {
    return visiblePages.filter(
      (page) => typeof page === "number" && page <= totalPages
    );
  };

  const getVisiblePages = (
    page: number,
    total: number
  ): (number | string)[] => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, "...", page - 1, page, page + 1, "...", total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, "...", total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, "...", total];
      }
    }
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={goPrevious}
        className="bg-primary text-onPrimary px-3 py-2 rounded"
        disabled={currentPage <= 1}
      >
        &larr;
      </button>
      {visiblePages.map((page, index) => (
        <button
          key={index}
          className={`px-2 py-1 rounded ${
            currentPage === page ? "bg-primary text-onPrimary" : "bg-surface"
          } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
          onClick={() => {
            if (typeof page === "number") {
              gotoPage(page);
            }
          }}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goNext}
        className="bg-primary text-onPrimary px-3 py-2 rounded"
        disabled={currentPage >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default CustomPagination;
