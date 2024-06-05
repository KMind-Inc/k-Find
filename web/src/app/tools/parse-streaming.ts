import { Source } from "@/app/global/source";

export const parseStreaming = async (
  controller: AbortController,
  query: string,
  search_uuid: string,
  search_type: string,
  lang: string,
  onSources: (value: Source[]) => void,
  onMarkdown: (value: string) => void,
  onError?: (status: number) => void,
) => {
  
  const apiurl = process.env.API_URL || "https://kfind.hikos.cn";
  console.log(process.env.API_URL, apiurl)

  try {
    
    const response = await fetch(apiurl + `/stream?query=${encodeURIComponent(query)}&search_uuid=${search_uuid}&search_type=${search_type}&lang=${lang}`, {
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
    let refFlag = true;
  
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
        if (refFlag) {
          currentJson += line 
          if (line.endsWith("}]}")) {
            const jsonMatch = currentJson.match(/data: ({.*})/);
            if (jsonMatch && jsonMatch[1]) {
                const jsonString = jsonMatch[1];
                try {
                    onSources(JSON.parse(jsonString).references);
                    refFlag = false;
                } catch (error) {
                    refFlag = false;
                    console.error("Failed to parse JSON:", error);
                }
            } else {
                refFlag = false;
                console.error("No JSON string found in the input.");
            }
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