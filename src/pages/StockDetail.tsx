import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

async function fetchStockDetail(symbol: string) {
  const res = await fetch(`/api/quote?symbol=${symbol}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["stockDetail", symbol],
    queryFn: () => fetchStockDetail(symbol!),
    enabled: !!symbol,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-12 container mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-24 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen pt-24 pb-12 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Stock not found</h2>
        <Link to="/" className="inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </main>
    );
  }

  const isPositive = data.change >= 0;

  return (
    <main className="min-h-screen pt-24 pb-12 container mx-auto px-4">

      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {data.name} ({data.symbol})
        </h1>

        <p className="text-2xl font-semibold">
          ₹{Number(data.price).toLocaleString("en-IN")}
        </p>

        <p className={isPositive ? "text-success" : "text-destructive"}>
          {isPositive ? "+" : ""}
          {data.change.toFixed(2)} ({data.pChange.toFixed(2)}%)
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Metric label="Price" value={data.price} />
        <Metric label="Change" value={data.change} />
        <Metric label="% Change" value={data.pChange} />

      </div>

      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-2 mt-8 text-primary">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

    </main>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="glass-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">
        {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}