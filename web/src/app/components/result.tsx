"use client";
import { Answer } from "@/app/components/answer";
import { Sources } from "@/app/components/sources";
import { Source } from "@/app/global/source";
import { parseStreamingEx, fetchJobId, fetchEventStream } from "@/app/tools/parse-streaming";
import { Annoyed } from "lucide-react";
import { FC, useEffect, useState, useRef } from "react";
import Locale, { getLang } from "../locales";

export const Result: FC<any> = ({ queryParams}) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<number | null>(null);

  const fetchData = async (controller: AbortController, onSuccess: any, onFailed: any) => {
    // if (jobId) {
    //   void parseStreamingEx(controller, queryParams.query, queryParams.rid, queryParams.search_type, jobId, getLang(), setSources, setMarkdown, setError, onSuccess, onFailed);    
    // } else {
    //   setError(500);
    // }
  };

  const isInitialMount = useRef(true);

  useEffect(() => {

    if(queryParams.query!="" && isInitialMount.current){

      const controller = new AbortController();
      const getAnswer = async() => {
        // fetchEventStream(queryParams.query, queryParams.rid, queryParams.searchType, getLang());
        // const jobId = await fetchJobId(queryParams.query, queryParams.rid, queryParams.searchType, getLang());
        // queryOnLoop(controller);
        void parseStreamingEx(controller, queryParams.query, queryParams.rid, queryParams.searchType, getLang(), setSources, setMarkdown, setError);    

      };
  
      getAnswer();

      isInitialMount.current = false;
  
      return () => {
        controller.abort();
      };
    }
   
  }, [queryParams]);


  const queryOnLoop = (controller: AbortController) => {
    fetchData(controller, 
      () => {
        console.log("success!")
      },
      () => {
        console.log("failed")
        setTimeout(() => {
          queryOnLoop(controller);
        }, 5000);
      }
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Answer markdown={markdown} sources={sources}></Answer>
      <Sources sources={sources}></Sources>
      {error && (
        <div className="absolute inset-4 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="p-4 bg-white shadow-2xl rounded text-blue-500 font-medium flex gap-4">
            <Annoyed></Annoyed>
            {error === 429 ? Locale.Err[429] : Locale.Err[500]}
          </div>
        </div>
      )}
    </div>
  );
};
