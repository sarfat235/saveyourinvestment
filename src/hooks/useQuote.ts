import { useQuery } from "@tanstack/react-query";
import { fetchQuote, type QuoteData } from "@/services/marketData";

/**
 * Custom hook to fetch live stock/index data.
 * @param symbol - The ticker symbol (e.g., "NIFTY", "RELIANCE")
 */
export function useQuote(symbol: string) {
  return useQuery<QuoteData>({
    queryKey: ["quote", symbol],
    queryFn: () => fetchQuote(symbol),
    // Only run the query if a symbol is actually provided
    enabled: Boolean(symbol),
    // Keep data fresh for 5 minutes to save API credits
    staleTime: 5 * 60 * 1000, 
    // Recommended settings for financial data to prevent unnecessary background reloads
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
}

