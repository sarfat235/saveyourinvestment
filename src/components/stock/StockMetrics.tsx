import { Stock } from '@/data/mockStocks';
import { TrendingUp, TrendingDown, BarChart2, DollarSign, Activity, Target } from 'lucide-react';

interface StockMetricsProps {
  stock: Stock;
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
}

function MetricCard({ label, value, icon, subValue, trend }: MetricCardProps) {
  return (
    <div className="glass-card-hover p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      {subValue && (
        <p className={`text-sm mt-1 ${
          trend === 'up' ? 'text-success' : 
          trend === 'down' ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {subValue}
        </p>
      )}
    </div>
  );
}

export function StockMetrics({ stock }: StockMetricsProps) {
  const formatMarketCap = (cap: number) => {
    if (cap >= 100000) return `₹${(cap / 100000).toFixed(2)} L Cr`;
    if (cap >= 1000) return `₹${(cap / 1000).toFixed(2)} K Cr`;
    return `₹${cap.toFixed(2)} Cr`;
  };

  const formatVolume = (vol: number) => {
    if (vol >= 10000000) return `${(vol / 10000000).toFixed(2)} Cr`;
    if (vol >= 100000) return `${(vol / 100000).toFixed(2)} L`;
    if (vol >= 1000) return `${(vol / 1000).toFixed(2)} K`;
    return vol.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        label="Market Cap"
        value={formatMarketCap(stock.marketCap)}
        icon={<DollarSign className="w-4 h-4 text-primary" />}
      />
      <MetricCard
        label="P/E Ratio"
        value={stock.pe.toFixed(2)}
        icon={<BarChart2 className="w-4 h-4 text-accent" />}
        subValue={stock.pe < 20 ? 'Undervalued' : stock.pe > 40 ? 'Overvalued' : 'Fair'}
        trend={stock.pe < 20 ? 'up' : stock.pe > 40 ? 'down' : 'neutral'}
      />
      <MetricCard
        label="EPS"
        value={`₹${stock.eps.toFixed(2)}`}
        icon={<TrendingUp className="w-4 h-4 text-success" />}
      />
      <MetricCard
        label="Volume"
        value={formatVolume(stock.volume)}
        icon={<Activity className="w-4 h-4 text-warning" />}
        subValue={`Avg: ${formatVolume(stock.avgVolume)}`}
      />
      <MetricCard
        label="Day High"
        value={`₹${stock.dayHigh.toLocaleString('en-IN')}`}
        icon={<TrendingUp className="w-4 h-4 text-success" />}
      />
      <MetricCard
        label="Day Low"
        value={`₹${stock.dayLow.toLocaleString('en-IN')}`}
        icon={<TrendingDown className="w-4 h-4 text-destructive" />}
      />
      <MetricCard
        label="52W High"
        value={`₹${stock.weekHigh52.toLocaleString('en-IN')}`}
        icon={<Target className="w-4 h-4 text-success" />}
        subValue={`${(((stock.price - stock.weekHigh52) / stock.weekHigh52) * 100).toFixed(1)}% from high`}
        trend="down"
      />
      <MetricCard
        label="52W Low"
        value={`₹${stock.weekLow52.toLocaleString('en-IN')}`}
        icon={<Target className="w-4 h-4 text-destructive" />}
        subValue={`${(((stock.price - stock.weekLow52) / stock.weekLow52) * 100).toFixed(1)}% from low`}
        trend="up"
      />
    </div>
  );
}
