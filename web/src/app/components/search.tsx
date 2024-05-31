"use client";
import { getSearchUrl } from "@/app/tools/get-search-url";
import React, { FC, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Switch } from "antd";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Locale from "../locales";

interface SearchProps {
  useContinueButton?: boolean;
}

export const Search: FC<SearchProps> = ({ useContinueButton = false }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const old_rid = decodeURIComponent(searchParams.get("rid") || "");
  
  const [isNormalSearch, setIsNormalSearch] = useState(
    () => localStorage.getItem("isNormalSearch") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isNormalSearch", String(isNormalSearch));
  }, [isNormalSearch]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (value) {
      setValue("");
      const type = isNormalSearch ? "SIMPLE" : "DEEP";
      const rid = nanoid();
      // router.push(getSearchUrl(encodeURIComponent(value), rid, type));
      window.location.href = getSearchUrl(encodeURIComponent(value), rid, type);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleNewSearch = () => {
    if (value) {
      setValue(""); 
      const type = isNormalSearch ? "SIMPLE" : "DEEP";
      router.push(getSearchUrl(encodeURIComponent(value), nanoid(), type));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        className="border-2 border-blue-500 relative bg-white flex flex-col justify-end border ring-8 ring-zinc-300/20 py-2 px-2 rounded-lg gap-2 focus-within:border-zinc-300"
        htmlFor="search-bar"
      >
        <textarea
          id="search-bar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          placeholder={Locale.Search.placeholder}
          className="rounded-md px-2 w-full outline-none flex-1 pr-6 bg-white h-32 resize-none"
          onKeyDown={handleKeyDown}
        />
        <div className="absolute bottom-2 right-2">
          <Switch
            checked={!isNormalSearch}
            onChange={() => setIsNormalSearch(!isNormalSearch)}
            checkedChildren={Locale.Type.deep}
            unCheckedChildren={Locale.Type.simple}
            defaultChecked={false}
          />
        </div>
      </label>
    </form>
  );
};
