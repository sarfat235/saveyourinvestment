import { useQuery } from "@tanstack/react-query";
import { useQuote } from "@/hooks/useQuote";
import { fetchMarketMovers } from "@/services/marketData";
import { MarketIndexCard } from "./MarketIndexCard";
import { StockListCard } from "./StockListCard";

export function MarketOverview() {

  // ✅ Movers (gainers/losers)
  const {
    data: movers,
    isLoading: moversLoading,
    isError: moversError
  } = useQuery({
    queryKey: ["marketMovers"],
    queryFn: fetchMarketMovers,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  // ✅ Index quotes
  const nifty = useQuote("NIFTY 50");
  const sensex = useQuote("SENSEX");
  const bank = useQuote("BANK NIFTY");

  const liveIndices = [
    { q: nifty, name: "NIFTY 50", symbol: "NIFTY" },
    { q: sensex, name: "SENSEX", symbol: "SENSEX" },
    { q: bank, name: "BANK NIFTY", symbol: "BANKNIFTY" },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Market Overview
          </h2>
          <p className="text-muted-foreground">
            Live NSE / BSE Market Data
          </p>
        </div>

        {/* ✅ Indices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {liveIndices.map(({ q, name, symbol }) => (
            <MarketIndexCard
              key={symbol}
              index={{
                symbol,
                name,
                value: q.data?.regularMarketPrice ?? 0,
                change: q.data?.regularMarketChange ?? 0,
                changePercent: q.data?.regularMarketChangePercent ?? 0,
              }}
            />
          ))}
        </div>

        {/* ✅ Movers */}
        {moversError && (
          <div className="text-center text-destructive mb-6">
            Failed to load market movers
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <StockListCard
            title="Top Gainers"
            stocks={movers?.top_gainers || []}
            type="gainers"
            loading={moversLoading}
          />

          <StockListCard
            title="Top Losers"
            stocks={movers?.top_losers || []}
            type="losers"
            loading={moversLoading}
          />

        </div>

      </div>
    </section>
  );
}
