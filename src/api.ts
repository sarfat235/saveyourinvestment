const BASE = import.meta.env.VITE_API_BASE;
const KEY = import.meta.env.VITE_API_KEY;
export type Stock = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
};
export async function apiGet(path: string, params: Record<string, string> = {}) {
    const url = new URL(BASE + path);

    Object.entries(params).forEach(([k, v]) => {
        url.searchParams.append(k, v);
    });

    const res = await fetch(url.toString(), {
        headers: {
            "x-api-key": KEY
        }
    });

    if (!res.ok) throw new Error("API Error");
    return res.json();
}

export const getTrending = () => apiGet("/trending");
export const getMostActive = () => apiGet("/NSE_most_active");
export const getShockers = () => apiGet("/price_shockers");
export const searchStock = (name: string) => apiGet("/stock", { name });
