import React, { FC } from "react";

export const Logo: FC = () => {

  const name = process.env.NAME || "kfind";

  return (
    <div className="flex gap-4 items-center justify-center cursor-default select-none relative">
      <div className="h-10 w-10">
        <img
          src="logo.svg"
          alt="Search Icon"
          width="40"
          height="40"
          className="icon icon-tabler icon-tabler-search"
        />
      </div>
      <div className="relative text-nowrap font-medium text-2xl md:text-3xl text-center text-zinc-950 ">
        {name}
      </div>
    </div>
  );
};
