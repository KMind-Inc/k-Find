const cn = {
  Type: {
    simple: "普通",
    deep: "深度",
  },
  Title: {
    return: "",
  },
  Search: {
    placeholder: "基于kOS智能搜索...",
  },
  Footer: {
    statement: "上述内容由kFind AI搜索并总结，请仔细甄别。",
  },
  Answer: {
    answer: "回答",
  },
  Sources: {
    sources: "答案来自网页",
  },
  Err: {
    429: "感谢有很多问题需要kFind解答，但过于频繁，容我休息一下",
    500: "您好，kFind这会有点手忙脚乱，容他休息一会，谢谢！",
  },
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
