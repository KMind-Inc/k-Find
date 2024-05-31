import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/popover";
import { AnimationEffect } from "@/app/components/animation-effect";
import { Wrapper } from "@/app/components/wrapper";
import { Source } from "@/app/global/source";
import Image from "next/image";
import { FC, useRef } from "react";
import Markdown from "react-markdown";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import Locale from "../locales";
import React, { useEffect, useState } from 'react';

export const Answer: FC<{ markdown: string; sources: Source[] }> = ({
  markdown,
  sources,
}) => {

  const [markdownContent, setMarkdownContent] = useState<string>('');

  return (
    <Wrapper
      title={
        <>
          <Image src="/answer.svg" alt="Answer" width={24} height={24} />{" "} {Locale.Answer.answer}
        </>
      }
      content={
        markdown ? (
          <div className="prose prose-sm max-w-full">
            <Markdown
              components={{
                a: ({ node: _, ...props }) => {
                  if (!props.href) return <></>;
                  const source = sources[+props.href - 1];
                  if (!source) return <></>;
                  return (
                    <span className="inline-block w-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <span
                            title={source.title}
                            className="inline-block cursor-pointer transform scale-[60%] no-underline font-medium bg-zinc-300 hover:bg-zinc-400 w-6 text-center h-6 rounded-full origin-top-left"
                          >
                            {props.href}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent
                          align={"start"}
                          className="max-w-screen-md flex flex-col gap-2 bg-white shadow-transparent ring-zinc-50 ring-4 text-xs"
                        >
                          <div className="text-ellipsis overflow-hidden whitespace-nowrap font-medium">
                            {source.title}
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1 overflow-hidden">
                              <div className="text-ellipsis text-blue-500 overflow-hidden whitespace-nowrap">
                                <a
                                  title={source.title}
                                  href={source.url}
                                  target="_blank"
                                >
                                  {source.url}
                                </a>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </span>
                  );
                },
              }}
            >
              {markdown}
            </Markdown>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <AnimationEffect className="max-w-sm h-4 bg-zinc-400/80"></AnimationEffect>
            <AnimationEffect className="max-w-lg h-4 bg-zinc-400/80"></AnimationEffect>
            <AnimationEffect className="max-w-2xl h-4 bg-zinc-400/80"></AnimationEffect>
            <AnimationEffect className="max-w-lg h-4 bg-zinc-400/80"></AnimationEffect>
            <AnimationEffect className="max-w-xl h-4 bg-zinc-400/80"></AnimationEffect>
          </div>
        )
      }
    ></Wrapper>
  );
};
