"use client";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Locale from "../locales";

export const Title = ({ query }: { query: string }) => {
  const router = useRouter();
  return (
    <div className="items-center pb-4 flex  mb-6 border-b gap-4">
      <div className="flex-none">
        <button
          onClick={() => {
            window.location.href = window.location.origin;
          }}
          type="button"
          className="text-blue-500 hover:bg-zinc-100 rounded flex gap-2 items-center bg-transparent px-2 py-1 text-xs font-semibold "
        >
          <ChevronsLeft size={24}></ChevronsLeft>
          {Locale.Title.return}
        </button>
      </div>
      <div
        className="flex-1 text-lg sm:text-xl text-black text-ellipsis overflow-hidden whitespace-nowrap"
        title={query}
      >
        {query}
      </div>
      
    </div>
  );
};
