export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  weekHigh52: number;
  weekLow52: number;
  marketCap: number;
  pe: number;
  eps: number;
  volume: number;
  avgVolume: number;
  sector: string;
  industry: string;
  exchange: string;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

export const marketIndices: MarketIndex[] = [
  { name: "NIFTY 50", symbol: "NIFTY", value: 24180.50, change: 125.30, changePercent: 0.52 },
  { name: "SENSEX", symbol: "SENSEX", value: 79802.15, change: 412.75, changePercent: 0.52 },
  { name: "BANK NIFTY", symbol: "BANKNIFTY", value: 51890.20, change: -180.45, changePercent: -0.35 },
  { name: "NIFTY IT", symbol: "NIFTYIT", value: 42156.80, change: 285.60, changePercent: 0.68 },
];

export const stocks: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2890.45,
    change: 45.20,
    changePercent: 1.59,
    dayHigh: 2915.00,
    dayLow: 2840.50,
    weekHigh52: 3217.60,
    weekLow52: 2220.30,
    marketCap: 1956000,
    pe: 28.5,
    eps: 101.42,
    volume: 8945230,
    avgVolume: 7500000,
    sector: "Energy",
    industry: "Oil & Gas",
    exchange: "NSE"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    price: 4125.80,
    change: 62.35,
    changePercent: 1.53,
    dayHigh: 4150.00,
    dayLow: 4055.20,
    weekHigh52: 4592.25,
    weekLow52: 3310.00,
    marketCap: 1490000,
    pe: 32.1,
    eps: 128.53,
    volume: 2341560,
    avgVolume: 2000000,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE"
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1685.25,
    change: -12.40,
    changePercent: -0.73,
    dayHigh: 1710.00,
    dayLow: 1675.50,
    weekHigh52: 1794.00,
    weekLow52: 1363.55,
    marketCap: 1280000,
    pe: 19.8,
    eps: 85.11,
    volume: 6782340,
    avgVolume: 5500000,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE"
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1892.60,
    change: 28.75,
    changePercent: 1.54,
    dayHigh: 1905.00,
    dayLow: 1858.30,
    weekHigh52: 1997.40,
    weekLow52: 1358.35,
    marketCap: 785000,
    pe: 29.4,
    eps: 64.38,
    volume: 4521890,
    avgVolume: 4000000,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE"
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 1245.90,
    change: 18.65,
    changePercent: 1.52,
    dayHigh: 1255.00,
    dayLow: 1220.45,
    weekHigh52: 1362.35,
    weekLow52: 970.00,
    marketCap: 875000,
    pe: 18.2,
    eps: 68.46,
    volume: 5678920,
    avgVolume: 5000000,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE"
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd",
    price: 2456.30,
    change: -8.90,
    changePercent: -0.36,
    dayHigh: 2480.00,
    dayLow: 2445.20,
    weekHigh52: 2859.30,
    weekLow52: 2172.05,
    marketCap: 576000,
    pe: 58.5,
    eps: 41.99,
    volume: 1234560,
    avgVolume: 1100000,
    sector: "Consumer Goods",
    industry: "FMCG",
    exchange: "NSE"
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 812.45,
    change: 15.30,
    changePercent: 1.92,
    dayHigh: 820.00,
    dayLow: 795.60,
    weekHigh52: 912.00,
    weekLow52: 555.00,
    marketCap: 725000,
    pe: 11.2,
    eps: 72.54,
    volume: 12456780,
    avgVolume: 10000000,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE"
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    price: 1678.90,
    change: 32.45,
    changePercent: 1.97,
    dayHigh: 1690.00,
    dayLow: 1640.25,
    weekHigh52: 1779.00,
    weekLow52: 1066.85,
    marketCap: 985000,
    pe: 75.3,
    eps: 22.30,
    volume: 3456780,
    avgVolume: 3000000,
    sector: "Telecom",
    industry: "Telecommunications",
    exchange: "NSE"
  },
  {
    symbol: "ITC",
    name: "ITC Ltd",
    price: 498.65,
    change: -2.15,
    changePercent: -0.43,
    dayHigh: 505.00,
    dayLow: 495.30,
    weekHigh52: 528.55,
    weekLow52: 399.35,
    marketCap: 620000,
    pe: 28.9,
    eps: 17.25,
    volume: 9876540,
    avgVolume: 8500000,
    sector: "Consumer Goods",
    industry: "FMCG",
    exchange: "NSE"
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd",
    price: 542.80,
    change: 8.95,
    changePercent: 1.68,
    dayHigh: 548.00,
    dayLow: 532.40,
    weekHigh52: 585.00,
    weekLow52: 401.05,
    marketCap: 285000,
    pe: 24.6,
    eps: 22.07,
    volume: 3214560,
    avgVolume: 2800000,
    sector: "Technology",
    industry: "IT Services",
    exchange: "NSE"
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    price: 945.60,
    change: -18.25,
    changePercent: -1.89,
    dayHigh: 970.00,
    dayLow: 940.15,
    weekHigh52: 1179.00,
    weekLow52: 608.30,
    marketCap: 348000,
    pe: 8.5,
    eps: 111.25,
    volume: 8765430,
    avgVolume: 7500000,
    sector: "Automobile",
    industry: "Auto",
    exchange: "NSE"
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd",
    price: 12456.75,
    change: 185.40,
    changePercent: 1.51,
    dayHigh: 12520.00,
    dayLow: 12250.30,
    weekHigh52: 13680.00,
    weekLow52: 9737.65,
    marketCap: 392000,
    pe: 30.2,
    eps: 412.47,
    volume: 456780,
    avgVolume: 400000,
    sector: "Automobile",
    industry: "Auto",
    exchange: "NSE"
  },
  {
    symbol: "AXISBANK",
    name: "Axis Bank Ltd",
    price: 1156.30,
    change: 22.85,
    changePercent: 2.02,
    dayHigh: 1165.00,
    dayLow: 1128.45,
    weekHigh52: 1339.65,
    weekLow52: 995.70,
    marketCap: 357000,
    pe: 14.8,
    eps: 78.13,
    volume: 5678900,
    avgVolume: 4800000,
    sector: "Financial Services",
    industry: "Banking",
    exchange: "NSE"
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd",
    price: 3678.45,
    change: 52.30,
    changePercent: 1.44,
    dayHigh: 3705.00,
    dayLow: 3615.20,
    weekHigh52: 3949.65,
    weekLow52: 2880.00,
    marketCap: 506000,
    pe: 35.6,
    eps: 103.33,
    volume: 1234560,
    avgVolume: 1100000,
    sector: "Construction",
    industry: "Infrastructure",
    exchange: "NSE"
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd",
    price: 2845.90,
    change: -15.65,
    changePercent: -0.55,
    dayHigh: 2880.00,
    dayLow: 2830.25,
    weekHigh52: 3422.95,
    weekLow52: 2670.10,
    marketCap: 273000,
    pe: 52.8,
    eps: 53.90,
    volume: 876540,
    avgVolume: 750000,
    sector: "Consumer Goods",
    industry: "Paints",
    exchange: "NSE"
  },
];

export const getTopGainers = (): Stock[] => {
  return [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
};

export const getTopLosers = (): Stock[] => {
  return [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);
};

export const searchStocks = (query: string): Stock[] => {
  const lowercaseQuery = query.toLowerCase();
  return stocks.filter(
    stock =>
      stock.symbol.toLowerCase().includes(lowercaseQuery) ||
      stock.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return stocks.find(stock => stock.symbol.toLowerCase() === symbol.toLowerCase());
};

// Generate mock price history data
export const generatePriceHistory = (stock: Stock, days: number = 365) => {
  const data = [];
  let price = stock.price * (1 - Math.random() * 0.3);
  const volatility = 0.02;
  const trend = (stock.price - price) / days;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 2 * volatility * price;
    price = Math.max(price + trend + randomChange, stock.weekLow52 * 0.9);
    price = Math.min(price, stock.weekHigh52 * 1.1);

    const open = price * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, price) * (1 + Math.random() * 0.015);
    const low = Math.min(open, price) * (1 - Math.random() * 0.015);
    const close = price;
    const volume = stock.avgVolume * (0.5 + Math.random());

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.round(volume),
    });
  }

  return data;
};
