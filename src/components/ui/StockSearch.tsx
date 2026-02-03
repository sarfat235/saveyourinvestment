
import { useNavigate } from "react-router-dom"
import { useStockSearch } from "@/hooks/useStockSearch"

type Props = {
    searchTerm: string
}

export default function StockSearch({ searchTerm }: Props) {
    const navigate = useNavigate()

    const { data, isLoading } = useStockSearch(searchTerm)

    if (isLoading) return <p>Searching...</p>

    return (
        <div className="space-y-1">
            {data?.result?.map((stock: any) => (
                <div
                    key={stock.symbol}
                    onClick={() => navigate(`/stock/${stock.symbol}`)}
                    className="cursor-pointer rounded-md p-2 hover:bg-muted"
                >
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                        {stock.description}
                    </div>
                </div>
            ))}
        </div>
    )
}
