"use client";
import { getSearchUrl } from "@/app/tools/get-search-url";
import React, { FC, useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Locale from "../locales";
import { Button } from 'antd';
// import { Switch } from "antd";
// import { Button } from "@/app/components/button";

interface SearchProps {
  useContinueButton?: boolean;
}

const CustomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6543 30.4674L11.4043 24.2174L41.5293 12.5924M41.5293 12.5924L30.1543 42.9674L23.9043 36.7174M41.5293 12.5924L20.6543 33.4674L18.8117 38.136" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const Search: FC<SearchProps> = ({ useContinueButton = false }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const old_rid = decodeURIComponent(searchParams.get("rid") || "");
  
  // const [isNormalSearch, setIsNormalSearch] = useState(
  //   () => localStorage.getItem("isNormalSearch") !== "false"
  // );

  // useEffect(() => {
  //   localStorage.setItem("isNormalSearch", String(isNormalSearch));
  // }, [isNormalSearch]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (value) {
      setValue("");
      // const type = isNormalSearch ? "SIMPLE" : "DEEP";
      const rid = nanoid();
      // router.push(getSearchUrl(encodeURIComponent(value), rid, type));
      window.location.href = getSearchUrl(encodeURIComponent(value), rid, "SIMPLE");
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
      // const type = isNormalSearch ? "SIMPLE" : "DEEP";
      router.push(getSearchUrl(encodeURIComponent(value), nanoid(), "SIMPLE" ));
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
        <div className="absolute bottom-1 right-1">
          {/* <Switch
            checked={!isNormalSearch}
            onChange={() => setIsNormalSearch(!isNormalSearch)}
            checkedChildren={Locale.Type.deep}
            unCheckedChildren={Locale.Type.simple}
            defaultChecked={true}
          /> */}
          {/* <Button onClick={handleSubmit}/> */}
          <Button onClick={handleSubmit} type="primary" icon={<CustomIcon />} style={{ display: 'flex', alignItems: 'center', padding: '1px 5px', }}>
            搜索
          </Button> 
        </div>
      </label>
    </form>
  );
};
