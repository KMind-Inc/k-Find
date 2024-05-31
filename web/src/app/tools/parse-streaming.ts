import { Source } from "@/app/global/source";
import { fetchStream } from "@/app/tools/fetch-stream";

const LLM_SPLIT = "__LLM_RESPONSE__";
const RELATED_SPLIT = "__RELATED_QUESTIONS__";

async function duplicateResponse(response: Response): Promise<Response> {
  const body = await response.clone().arrayBuffer();
  const clonedResponse = new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
  });
  return clonedResponse;
}

export const fetchJobId = async (query: string, search_uuid: string, search_type: string, lang: string): Promise<string | null> => {
    
    console.log("parse-streaming fetchJobId: ", query, search_uuid, search_type, lang)
    
    const response = await fetch(`/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*./*",
      },
      body: JSON.stringify({
        query,
        search_uuid,
        search_type,
        lang,
      }),
    });

    if (response.status !== 200) {
      // 处理错误状态码
      return null;
    }

    const data = await response.json();
    return data.jobId;
}

export const parseStreaming = async (
  controller: AbortController,
  query: string,
  search_uuid: string,
  search_type: string,
  job_id: string,
  lang: string,
  onSources: (value: Source[]) => void,
  onMarkdown: (value: string) => void,
  onError?: (status: number) => void,
  onSuccess?: any, 
  onFailed?: any
) => {

  console.log("parseStreaming: ", search_uuid, search_type, job_id)
  const decoder = new TextDecoder();
  let uint8Array = new Uint8Array();
  let chunks = "";
  let sourcesEmitted = false;

  const response:any = await fetch(`/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*./*",
    },
    body: JSON.stringify({
      query,
      search_uuid,
      search_type,
      lang,
      job_id,
    }),
  });

  if (response.status !== 200) {
    // 处理错误状态码
    return null;
  }

  // 复制响应
  const clonedResponse = await response.clone();
  const fetchStreamResponse = await clonedResponse.clone();

  const contentType = response.headers.get('content-type');

  let jsonData, textData;
  
  // 根据 Content-Type 处理响应体
  if (contentType.includes('application/json')) {
    // 如果是 JSON 格式
    jsonData = await clonedResponse.json()
    console.log('JSON 数据:', jsonData);
  } else if (contentType.includes('text/')) {
      // 如果是文本格式
      textData = await response.text();
      console.log('文本数据:', textData);
  } 

  // 确保 jsonData 和 textData 是已定义的
  jsonData = jsonData || {};
  textData = textData || "";

  if (response.status === 200 && jsonData.data?.jobStatus === 'running') {
    if (onFailed) {
      onFailed()
    }
  } else if (response.status !== 200) {
    if (onFailed) {
      onFailed()
    }
  } else if (response.status === 200 && textData.includes("__LLM_RESPONSE__")) {
    if (onSuccess) {
      onSuccess()
    } 
  } else {
    if (onFailed) {
      onFailed()
    }
  }  

  const markdownParse = (text: string) => {
    onMarkdown(
      text
        .replace(/\[\[([cC])itation/g, "[citation")
        .replace(/[cC]itation:(\d+)]]/g, "citation:$1]")
        .replace(/\[\[([cC]itation:\d+)]](?!])/g, `[$1]`)
        .replace(/\[[cC]itation:(\d+)]/g, "[citation]($1)"),
    );
  };

  fetchStream(
    fetchStreamResponse,
    (chunk) => {
      uint8Array = new Uint8Array([...uint8Array, ...chunk]);
      chunks = decoder.decode(uint8Array, { stream: true });
      if (chunks.includes(LLM_SPLIT)) {
        const [sources, rest] = chunks.split(LLM_SPLIT);
        if (!sourcesEmitted) {
          try {
            onSources(JSON.parse(sources));
          } catch (e) {
            onSources([]);
          }
        }
        sourcesEmitted = true;
        if (rest.includes(RELATED_SPLIT)) {
          const [md] = rest.split(RELATED_SPLIT);
          markdownParse(md);
        } else {
          markdownParse(rest);
        }
      }
    },
    () => {
      const [_, relates] = chunks.split(RELATED_SPLIT);
      
    },
  );

};


export const parseStreamingEx = async (
  controller: AbortController,
  query: string,
  search_uuid: string,
  search_type: string,
  lang: string,
  onSources: (value: Source[]) => void,
  onMarkdown: (value: string) => void,
  onError?: (status: number) => void,
) => {
    
  try {
    
    const response = await fetch(`https://kfind.hikos.cn/stream?query=${encodeURIComponent(query)}&search_uuid=${search_uuid}&search_type=${search_type}&lang=${lang}`, {
      method: "GET",
      headers: {
        "Accept": "text/event-stream",
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get reader from response body');
    }
  
    const decoder = new TextDecoder();
    let currentMarkdown = '';
    let currentJson = '';
  
    const markdownParse = (text: any) => {
      currentMarkdown += text.replace(/\\n/g, "  \n");
      onMarkdown(currentMarkdown.replace(/\[\[([cC])itation/g, "[citation")
        .replace(/[cC]itation:(\d+)]]/g, "citation:$1]")
        .replace(/\[\[([cC]itation:\d+)]](?!])/g, `[$1]`)
        .replace(/\[[cC]itation:(\d+)]/g, "[citation]($1)"));
    };
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
  
      const text = decoder.decode(value, { stream: true });
      const lines = text.split('\n');
  
      for (const line of lines) {
        if (line.startsWith('data: ') && (text.includes("references") || text.endsWith("}]} "))) {
          currentJson += text 
          if (line.endsWith("}]}")) {
            onSources(JSON.parse(currentJson.split('\n')[1].substring(6)).references);
          }
        } else if (line.startsWith('data: ') && !line.includes("data: {\"success")) {
          markdownParse(line.substring(6));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching stream data:', error);
  }
  
}