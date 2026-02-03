import { useQuery } from "@tanstack/react-query";

type SearchItem = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
};

async function yahooSearch(query: string): Promise<SearchItem[]> {
    const res = await fetch(
        `/yahoo/v1/finance/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
        throw new Error("Search API error");
    }

    const data = await res.json();

    return (data.quotes || []).map((q: any) => ({
        symbol: q.symbol,
        name: q.shortname || q.longname || "",
        exchange: q.exchange || "",
        type: q.quoteType || "",
    }));
}

export function useStockSearch(query: string) {
    return useQuery({
        queryKey: ["stock-search", query],
        queryFn: () => yahooSearch(query),
        enabled: query.trim().length > 1,
        staleTime: 60_000,
    });
}
