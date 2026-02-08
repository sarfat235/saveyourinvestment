export const TICKERS = {
    INDICES: {
        NIFTY: "NIFTY",
        SENSEX: "SENSEX",
        BANKNIFTY: "BANKNIFTY",
    },
    STOCKS: {
        RELIANCE: "RELIANCE",
        TCS: "TCS",
        INFY: "INFY",
        HDFC: "HDFCBANK",
    }
} as const; // 'as const' makes the values read-only for better TypeScript safety
