import { AnimationEffect } from "@/app/components/animation-effect";
import { Wrapper } from "@/app/components/wrapper";
import { Source } from "@/app/global/source";
import Image from "next/image";
import { FC } from "react";
import Locale from "../locales";

interface SourceItemProps {
  source: Source;
  index: number;
}

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      alert("链接已复制");
    } catch (error) {
      console.error("复制至剪贴板失败: ", error);
    }
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; 
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("链接已复制");
    } catch (error) {
      console.error("复制至剪贴板失败", error);
    }
    document.body.removeChild(textArea);
  }
};

const SourceItem: FC<SourceItemProps> = ({ source, index }) => {
  const { title, url } = source;

  const handleClick = (e: React.MouseEvent) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      e.preventDefault();
      copyToClipboard(url);
    }
  };

  return (
    <div className="relative flex items-center gap-1">
      <div className="flex items-center text-gray-500 justify-center h-4 w-4 text-sm">
        {index + 1}.
      </div>
      <div className="overflow-hidden text-gray-500 whitespace-nowrap text-sm">
        {title}
      </div>
      <a href={url} onClick={handleClick} target="_blank" className="absolute inset-0"></a>
      <img src="link.svg" alt="Link" width={12} height={12} />
    </div>
  );
};

export const Sources: FC<{ sources: Source[] }> = ({ sources }) => {
  return (
    <Wrapper
      title={
        <>
          <Image src="link.svg" alt="Link" width={24} height={24} />{" "} {Locale.Sources.sources}
        </>
      }
      content={
        <div className="grid gap-2">
          {sources.length > 0 ? (
            sources.map((item, index) => (
              <SourceItem key={index} index={index} source={item}></SourceItem>
            ))
          ) : (
            <>
              <AnimationEffect className="max-w-sm h-4 bg-zinc-400/80"></AnimationEffect>
              <AnimationEffect className="max-w-lg h-4 bg-zinc-400/80"></AnimationEffect>
              <AnimationEffect className="max-w-2xl h-4 bg-zinc-400/80"></AnimationEffect>
              <AnimationEffect className="max-w-lg h-4 bg-zinc-400/80"></AnimationEffect>
              <AnimationEffect className="max-w-xl h-4 bg-zinc-400/80"></AnimationEffect>
              <AnimationEffect className="max-w-2sm h-4 bg-zinc-400/80"></AnimationEffect>
            </>
          )}
        </div>
      }
    ></Wrapper>
  );
};
