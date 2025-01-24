import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/types/types";

export function PaginationDemo({
  totalPages,
  currentPage,
  pages,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
