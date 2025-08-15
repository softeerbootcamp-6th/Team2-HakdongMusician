export const QUERY_STALE_TIME = 5 * 60 * 1000; // 5분
export const QUERY_GC_TIME = 10 * 60 * 1000; // 10분

export const DEFAULT_QUERY_OPTIONS = {
  staleTime: QUERY_STALE_TIME,
  gcTime: QUERY_GC_TIME,
};
