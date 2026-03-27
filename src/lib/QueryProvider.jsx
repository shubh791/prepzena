"use client";

// ─────────────────────────────────────────────────────────────
//  src/lib/QueryProvider.jsx
//  Wraps the app with TanStack QueryClientProvider
//  Must be a client component — used inside server layout
// ─────────────────────────────────────────────────────────────

import { useState }                                from "react";
import { QueryClient, QueryClientProvider }        from "@tanstack/react-query";
import { ReactQueryDevtools }                      from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }) {
  // useState ensures each browser session gets its own client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:            1000 * 60 * 3,  // 3 min default
            gcTime:               1000 * 60 * 10, // 10 min cache
            refetchOnWindowFocus: true,            // re-fetch when user returns to tab
            refetchOnMount:       true,            // always re-check on mount
            retry: (count, err) =>
              err?.status >= 500 ? count < 2 : false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}