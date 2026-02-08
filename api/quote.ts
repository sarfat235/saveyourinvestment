import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { symbol } = req.query;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol required" });
        }

        // ✅ Correct endpoint
        const r = await fetch(
            `https://api.indianapi.in/stock?name=${encodeURIComponent(String(symbol))}`,
            {
                headers: {
                    "x-api-key": process.env.INDIAN_API_KEY || "",
                },
            }
        );

        if (!r.ok) {
            throw new Error("IndianAPI quote error");
        }

        const d = await r.json();

        // ✅ Map to frontend format
        const price = d.currentPrice?.NSE ?? d.currentPrice?.BSE ?? 0;
        const pct = d.percentChange ?? 0;

        const change = (price * pct) / 100;

        // cache 60 sec
        res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

        res.status(200).json({
            price,
            change,
            pChange: pct,
            symbol: d.tickerId,
            name: d.companyName
        });

    } catch (err) {
        console.error("Quote API error:", err);

        res.status(500).json({
            error: "Quote fetch failed"
        });
    }
}
