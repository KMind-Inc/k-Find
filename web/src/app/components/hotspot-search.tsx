import React, { FC, useMemo } from "react";
import { getSearchUrl } from "@/app/tools/get-search-url";
import { nanoid } from "nanoid";
import Link from "next/link";

const ArrowRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

export const HotSpot: FC<{ query: string }> = ({ query }) => {
  const rid = useMemo(() => nanoid(), []);
  return (
    <Link
      prefetch={false}
      title={query}
      href={getSearchUrl(query, rid, "SIMPLE")}
      className="flex items-center border border-zinc-200/50 text-ellipsis overflow-hidden text-nowrap rounded-lg bg-zinc-100 hover:bg-zinc-200/80 hover:text-zinc-950 px-2 py-1 text-xs font-medium text-zinc-600"
    >
      {query}
      <ArrowRightIcon />
    </Link>
  );
};
