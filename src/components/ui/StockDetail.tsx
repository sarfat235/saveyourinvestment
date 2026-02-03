import { useParams } from "react-router-dom"
import { useStockQuote } from "@/hooks/useStockQuote"

export default function StockDetail() {
    const { symbol } = useParams<{ symbol: string }>()
    const { data, isLoading, error } = useStockQuote(symbol!)

    if (isLoading) return <p>Loading price...</p>
    if (error) return <p>Error loading data</p>

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{symbol}</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>Current Price</div>
                <div>₹ {data.c}</div>

                <div>High</div>
                <div>₹ {data.h}</div>

                <div>Low</div>
                <div>₹ {data.l}</div>

                <div>Open</div>
                <div>₹ {data.o}</div>

                <div>Previous Close</div>
                <div>₹ {data.pc}</div>
            </div>
        </div>
    )
}
