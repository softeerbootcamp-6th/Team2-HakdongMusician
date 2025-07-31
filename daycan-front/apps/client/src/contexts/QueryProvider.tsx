import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { type ReactNode } from "react";

/**
 * 이미 QueryClient는 Context API를 통해 구현되어있기에
 * 따로 Context API를 통해 관리하지 않습니다.
 * @author 홍규진
 */
export function QueryClientProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1분 동안 fresh
        gcTime: 1000 * 60 * 5, // 언마운트 후 5분 동안 캐시 유지
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
