
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketIndexCardProps {
  index: MarketIndex;
}

export function MarketIndexCard({ index }: MarketIndexCardProps) {
  const isPositive = index.change >= 0;

  return (
    <div className="glass-card-hover p-5">

      <div className="flex items-start justify-between mb-3">

        <div>
          <p className="text-sm text-muted-foreground font-medium">
            {index.name}
          </p>

          <p className="text-2xl font-bold text-foreground mt-1">
            {index.value.toLocaleString('en-IN', {
              maximumFractionDigits: 2
            })}
          </p>
        </div>

        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isPositive ? "bg-success/10" : "bg-destructive/10"
        )}>
          {isPositive
            ? <TrendingUp className="w-5 h-5 text-success" />
            : <TrendingDown className="w-5 h-5 text-destructive" />
          }
        </div>

      </div>

      <div className="flex items-center gap-2">

        <span className={cn(
          "text-sm font-medium",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? '+' : ''}
          {index.change.toFixed(2)}
        </span>

        <span className={cn(
          "px-2 py-0.5 rounded-md text-xs font-medium",
          isPositive
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? '+' : ''}
          {index.changePercent.toFixed(2)}%
        </span>

      </div>

    </div>
  );
}