export type ScreenerStock = {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    change: number;
    pe?: number;
    marketCap?: number;
    sector?: string;
    volume?: number;
};

export type ScreenerFilters = {
    minPrice: number;
    maxPrice: number;
    minChange: number;
    maxPE: number;
    minMarketCap: number;
    sector: string | "all";
};

export function scoreStock(s: ScreenerStock) {
    let score = 0;

    if (s.changePercent > 4) score += 4;
    else if (s.changePercent > 2) score += 2;

    if ((s.pe ?? 99) < 20) score += 2;
    if ((s.marketCap ?? 0) > 50000) score += 2;
    if ((s.volume ?? 0) > 1_000_000) score += 1;

    return score;
}

export function applyFilters(list: ScreenerStock[], f: ScreenerFilters) {
    return list.filter(s =>
        s.price >= f.minPrice &&
        s.price <= f.maxPrice &&
        s.changePercent >= f.minChange &&
        (s.pe ?? 999) <= f.maxPE &&
        (s.marketCap ?? 0) >= f.minMarketCap &&
        (f.sector === "all" || s.sector === f.sector)
    );
}

/* 🎯 Strategy presets */

export const PRESETS = {
    momentum: {
        minPrice: 100,
        maxPrice: 100000,
        minChange: 2,
        maxPE: 80,
        minMarketCap: 10000,
        sector: "all"
    },
    value: {
        minPrice: 50,
        maxPrice: 5000,
        minChange: -5,
        maxPE: 20,
        minMarketCap: 20000,
        sector: "all"
    },
    breakout: {
        minPrice: 200,
        maxPrice: 100000,
        minChange: 4,
        maxPE: 60,
        minMarketCap: 15000,
        sector: "all"
    }
};