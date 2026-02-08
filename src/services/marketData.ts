// src/services/marketData.ts

export interface QuoteData {
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// ✅ quote uses your vercel api route
export async function fetchQuote(symbol: string): Promise<QuoteData> {
  const res = await fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) throw new Error("Quote fetch failed");

  const data = await res.json();

  return {
    regularMarketPrice: Number(data.price || 0),
    regularMarketChange: Number(data.change || 0),
    regularMarketChangePercent: Number(data.pChange || 0),
  };
}


// ✅ movers uses your vercel api route
export async function fetchMarketMovers(): Promise<{
  top_gainers: Stock[];
  top_losers: Stock[];
}> {
  const res = await fetch("/api/movers");
  if (!res.ok) throw new Error("Movers fetch failed");

  const data = await res.json();

  return {
    top_gainers: data.top_gainers || [],
    top_losers: data.top_losers || [],
  };
}

// 🔍 Search stock by name/symbol
export async function searchStock(query: string) {
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}