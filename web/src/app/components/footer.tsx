import Locale from "../locales";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="fixed bottom-20 left-0 right-0 text-center flex flex-col items-center text-xs text-zinc-700 gap-1">
      <div className="hidden md:block text-zinc-400">{Locale.Footer.statement}</div>
      <div className="md:hidden">
        <div className="text-zinc-400">
          <a
            className="text-blue-500 font-medium inline-flex gap-1 items-center flex-nowrap text-nowrap"
            href="https://kmind.com/"
          >
          Powered by kOS
          </a>
        </div>
      </div>

      <div className="hidden md:flex gap-2 justify-center">
        <div>
          <a
            className="text-blue-500 font-medium inline-flex gap-1 items-center flex-nowrap text-nowrap"
            href="https://kmind.com/"
          >
            Powered by kOS
          </a>
        </div>
        <div></div>
      </div>
      <div className="hidden md:flex items-center justify-center flex-wrap gap-x-4 gap-y-2 mt-2 text-zinc-400">
      All rights reserved.
版权所有 ©半个宇宙 2023浙ICP备2023017311号
用户协议
隐私政策
      </div>
    </div>
  );
};
