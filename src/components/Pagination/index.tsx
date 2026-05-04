import Link from "next/link";

import {
  PaginationContainerStyle,
  PaginationItemActiveStyle,
  PaginationItemDisabledStyle,
  PaginationItemStyle,
} from "./index.css";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
}

function buildHref(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  const sep = basePath.includes("?") ? "&" : "?";
  return `${basePath}${sep}page=${page}`;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasPrev = safeCurrent > 1;
  const hasNext = safeCurrent < totalPages;

  return (
    <nav className={PaginationContainerStyle} aria-label={"Pagination"}>
      {hasPrev ? (
        <Link
          className={PaginationItemStyle}
          href={buildHref(basePath, safeCurrent - 1)}
          rel={"prev"}
        >
          {"« Prev"}
        </Link>
      ) : (
        <span
          className={`${PaginationItemStyle} ${PaginationItemDisabledStyle}`}
        >
          {"« Prev"}
        </span>
      )}

      {pages.map((page) => {
        if (page === safeCurrent) {
          return (
            <span
              key={page}
              className={`${PaginationItemStyle} ${PaginationItemActiveStyle}`}
              aria-current={"page"}
            >
              {page}
            </span>
          );
        }
        return (
          <Link
            key={page}
            className={PaginationItemStyle}
            href={buildHref(basePath, page)}
          >
            {page}
          </Link>
        );
      })}

      {hasNext ? (
        <Link
          className={PaginationItemStyle}
          href={buildHref(basePath, safeCurrent + 1)}
          rel={"next"}
        >
          {"Next »"}
        </Link>
      ) : (
        <span
          className={`${PaginationItemStyle} ${PaginationItemDisabledStyle}`}
        >
          {"Next »"}
        </span>
      )}
    </nav>
  );
}
