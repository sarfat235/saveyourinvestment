import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  applyFilters,
  scoreStock,
  PRESETS,
  ScreenerStock,
  ScreenerFilters
} from "@/services/ScreenerEngine";

/* ---- live universe ---- */

async function fetchUniverse(): Promise<ScreenerStock[]> {
  const r = await fetch("/api/movers");
  const d = await r.json();

  const base = [...(d.top_gainers || []), ...(d.top_losers || [])];

  return base.map((s: any) => ({
    ...s,
    pe: Math.random() * 60,
    marketCap: Math.random() * 200000,
    sector: ["IT", "BANK", "AUTO", "ENERGY"][Math.floor(Math.random() * 4)],
    volume: Math.random() * 2_000_000
  }));
}

export default function Screener() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["pro-universe"],
    queryFn: fetchUniverse
  });

  const [filters, setFilters] = useState<ScreenerFilters>({
    minPrice: 0,
    maxPrice: 100000,
    minChange: -100,
    maxPE: 50,
    minMarketCap: 0,
    sector: "all"
  });

  const applyPreset = (name: keyof typeof PRESETS) => {
    setFilters(PRESETS[name]);
  };

  const savePreset = () => {
    localStorage.setItem("myScreen", JSON.stringify(filters));
    alert("Preset saved");
  };

  const loadPreset = () => {
    const x = localStorage.getItem("myScreen");
    if (x) setFilters(JSON.parse(x));
  };

  const results = useMemo(() => {
    return applyFilters(data, filters)
      .map(s => ({ ...s, score: scoreStock(s) }))
      .sort((a, b) => b.score - a.score);
  }, [data, filters]);

  if (isLoading) return <div className="pt-24 text-center">Scanning market…</div>;

  return (
    <main className="pt-24 container mx-auto px-4">

      <h1 className="text-3xl font-bold mb-6">
        Pro Strategy Screener
      </h1>

      {/* Presets */}
      <div className="flex gap-3 mb-4">
        <Btn onClick={() => applyPreset("momentum")}>Momentum</Btn>
        <Btn onClick={() => applyPreset("value")}>Value</Btn>
        <Btn onClick={() => applyPreset("breakout")}>Breakout</Btn>
        <Btn onClick={savePreset}>Save</Btn>
        <Btn onClick={loadPreset}>Load</Btn>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <Num label="Min Price" v={filters.minPrice}
          set={v => setFilters(f => ({ ...f, minPrice: v }))} />
        <Num label="Min %Change" v={filters.minChange}
          set={v => setFilters(f => ({ ...f, minChange: v }))} />
        <Num label="Max PE" v={filters.maxPE}
          set={v => setFilters(f => ({ ...f, maxPE: v }))} />
      </div>

      {/* Results */}
      <div className="space-y-3">

        {results.map(s => (
          <Link key={s.symbol}
            to={`/stock/${s.symbol}`}
            className="glass-card p-4 flex justify-between hover:opacity-90"
          >
            <div>
              <div className="font-semibold">{s.symbol}</div>
              <div className="text-sm opacity-70">{s.name}</div>
            </div>

            <div className="text-right">
              ₹{s.price}
              <div className={s.changePercent >= 0 ? "text-success" : "text-destructive"}>
                {s.changePercent.toFixed(2)}%
              </div>
              <div className="text-xs">
                Score {s.score}
              </div>
            </div>
          </Link>
        ))}

      </div>

    </main>
  );
}

function Num({ label, v, set }: any) {
  return (
    <div>
      <label className="text-xs">{label}</label>
      <input type="number"
        value={v}
        onChange={e => set(+e.target.value)}
        className="w-full border p-2 rounded" />
    </div>
  );
}

function Btn({ children, onClick }: any) {
  return (
    <button onClick={onClick}
      className="px-3 py-2 rounded bg-primary/10 hover:bg-primary/20">
      {children}
    </button>
  );
}