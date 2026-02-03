import { useQuery } from "@tanstack/react-query";
import { fetchQuote } from "@/services/marketData";

export function useQuote(symbol: string) {
    return useQuery({
        queryKey: ["quote", symbol],
        queryFn: () => fetchQuote(symbol),
        enabled: Boolean(symbol),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });
}

