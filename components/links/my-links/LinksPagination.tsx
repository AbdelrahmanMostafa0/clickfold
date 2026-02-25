import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const LinksPagination = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    // Pages around current
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer text-white hover:bg-white/10 hover:text-white ${
              page <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => page > 1 && onPageChange(page - 1)}
          />
        </PaginationItem>

        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`} className="hidden sm:block">
              <PaginationEllipsis className="text-[#888]" />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                className={`cursor-pointer hover:bg-white/10 hover:text-white ${
                  page === p
                    ? "border-white/10 bg-white/10 text-white"
                    : "text-[#888]"
                }`}
                isActive={page === p}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer text-white hover:bg-white/10 hover:text-white ${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => page < totalPages && onPageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default LinksPagination;
