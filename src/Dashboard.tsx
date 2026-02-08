import { useEffect, useState } from "react";
import { getTrending, getMostActive, getShockers } from "./api";

export default function Dashboard() {
  const [trend, setTrend] = useState<any[]>([]);
  const [active, setActive] = useState<any[]>([]);
  const [shock, setShock] = useState<any[]>([]);

  useEffect(() => {
    getTrending().then(setTrend);
    getMostActive().then(setActive);
    getShockers().then(setShock);
  }, []);

  return (
    <div>

      <h2>Trending</h2>
      {trend.map((s,i)=> (
        <div key={i}>{s.name}</div>
      ))}

      <h2>Most Active</h2>
      {active.map((s,i)=> (
        <div key={i}>{s.name}</div>
      ))}

      <h2>Price Shockers</h2>
      {shock.map((s,i)=> (
        <div key={i}>{s.name}</div>
      ))}

    </div>
  );
}
