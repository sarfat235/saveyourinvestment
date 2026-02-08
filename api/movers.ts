import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const r = await fetch(
            "https://api.indianapi.in/price_shockers",
            {
                headers: {
                    "x-api-key": process.env.INDIAN_API_KEY || "",
                },
            }
        );

        if (!r.ok) {
            throw new Error("IndianAPI movers error");
        }

        const data = await r.json();

        // ✅ normalize → UI stock format
        const map = (d: any) => {
            const price = d.currentPrice?.NSE ?? d.currentPrice?.BSE ?? 0;
            const pct = d.percentChange ?? 0;

            return {
                symbol: d.tickerId,
                name: d.companyName,
                price,
                changePercent: pct,
                change: (price * pct) / 100,
            };
        };

        const list = Array.isArray(data) ? data.map(map) : [];

        const top_gainers = list
            .filter(x => x.changePercent >= 0)
            .sort((a, b) => b.changePercent - a.changePercent)
            .slice(0, 5);

        const top_losers = list
            .filter(x => x.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 5);

        // ✅ cache
        res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");

        res.status(200).json({
            top_gainers,
            top_losers
        });

    } catch (err) {
        console.error("Movers API error:", err);
        res.status(500).json({
            error: "Failed to fetch market movers"
        });
    }
}
