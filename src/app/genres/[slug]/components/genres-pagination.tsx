import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationProps } from "@/types/pagination";

export default function GenresPagination({
  animeData,
  genreName,
}: Readonly<{
  animeData: PaginationProps;
  genreName: string | null | undefined;
}>) {
  if (!animeData) {
    return null;
  }

  const { current_page, last_visible_page, has_previous_page, has_next_page } =
    animeData;

  const totalPages = last_visible_page > 0 ? last_visible_page : 1;

  const nextPageEnabled = has_next_page === true && current_page < totalPages;
  const prevPageEnabled = has_previous_page === true && current_page > 1;

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          {prevPageEnabled && (
            <PaginationPrevious
              href={`/genres/${genreName}/?page=${current_page - 1}`}
            />
          )}
        </PaginationItem>

        <PaginationLink isActive={true} className="cursor-not-allowed">
          {animeData?.current_page}
        </PaginationLink>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <PaginationEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuLabel>All Pages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="m-3 grid grid-cols-5">
              {[...Array(animeData?.last_visible_page)].map((_, index) => (
                <Link key={_} href={`/genres/${genreName}/?page=${index + 1}`}>
                  <DropdownMenuItem
                    className={`mb-2 mr-2 flex cursor-pointer justify-center ${
                      Number(animeData?.current_page) === index + 1
                        ? "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <PaginationItem>
          {nextPageEnabled && (
            <PaginationNext
              href={`/genres/${genreName}/?page=${current_page + 1}`}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
