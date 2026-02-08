import { useState } from "react";
import { searchStock } from "./api";

export default function StockSearch() {
    const [q, setQ] = useState("");
    const [data, setData] = useState<any>(null);

    async function handle() {
        const d = await searchStock(q);
        setData(d);
    }

    return (
        <div>
            <h2>Search Stock</h2>

            <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Tata Steel"
            />

            <button onClick={handle}>Search</button>

            {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}
