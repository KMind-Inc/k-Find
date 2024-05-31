export const getSearchUrl = (query: string, search_uuid: string, search_type: string) => {
  const prefix =
    process.env.NODE_ENV === "production" ? "/search.html" : "/search";
  return `${prefix}?q=${encodeURIComponent(query)}&search_type=${search_type}&rid=${search_uuid}`;
};
