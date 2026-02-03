import { useQuote } from "@/hooks/useQuote";
import { marketIndices, getTopGainers, getTopLosers } from '@/data/mockStocks';
import { MarketIndexCard } from './MarketIndexCard';
import { StockListCard } from './StockListCard';

export function MarketOverview() {
  const topGainers = getTopGainers();
  const topLosers = getTopLosers();
  const nifty = useQuote("NIFTYBEES.NS");   // Nifty ETF
  const sensex = useQuote("SENSEXETF.NS");  // Sensex ETF
  const bank = useQuote("BANKBEES.NS");     // Bank Nifty ETF

  const liveIndices = [
    { q: nifty, name: "NIFTY 50", symbol: "NIFTYBEES.NS" },
    { q: sensex, name: "SENSEX", symbol: "SENSEXETF.NS" },
    { q: bank, name: "BANK NIFTY", symbol: "BANKBEES.NS" },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Market Overview
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Track major Indian indices and discover today's top performing stocks
          </p>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {liveIndices.map(({ q, name, symbol }) => {
            const d = q.data || {};

            return (
              <MarketIndexCard
                key={symbol}
                index={{
                  symbol,
                  name,
                  value: d?.regularMarketPrice ?? 0,
                  change: d?.regularMarketChange ?? 0,
                  changePercent: d?.regularMarketChangePercent ?? 0,
                }}
              />
            );
          })}

        </div>

        {/* Gainers & Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockListCard
            title="Top Gainers"
            stocks={topGainers}
            type="gainers"
          />
          <StockListCard
            title="Top Losers"
            stocks={topLosers}
            type="losers"
          />
        </div>
      </div>
    </section>
  );
}
