
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '@/api';
import { cn } from '@/lib/utils';

interface StockListCardProps {
  title: string;
  stocks: Stock[] | undefined;
  type: 'gainers' | 'losers';
  loading?: boolean;
}

export function StockListCard({ title, stocks = [], type, loading }: StockListCardProps) {

  // ✅ Loading Skeleton
  if (loading) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50 bg-muted/20">
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </div>

        <div className="divide-y divide-border/50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">

      {/* Header */}
      <div className={cn(
        "px-5 py-4 border-b border-border/50 flex items-center gap-2",
        type === 'gainers' ? "bg-success/5" : "bg-destructive/5"
      )}>
        {type === 'gainers'
          ? <TrendingUp className="w-5 h-5 text-success" />
          : <TrendingDown className="w-5 h-5 text-destructive" />
        }

        <h3 className="font-semibold text-foreground">
          {title}
        </h3>
      </div>

      {/* List */}
      <div className="divide-y divide-border/50">

        {!stocks?.length ? (
          <div className="px-5 py-10 text-center text-muted-foreground text-sm italic">
            No data available
          </div>
        ) : (

          stocks.map((stock, i) => (
            <Link
              key={stock.symbol + i}
              to={`/stock/${stock.symbol}`}
              className="flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors group"
            >

              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {(stock.symbol || "--").slice(0, 2)}
                </div>

                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {stock.symbol}
                  </p>

                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {stock.name}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    ₹{Number(stock.price ?? 0).toLocaleString('en-IN')}
                  </p>

                  <p className={cn(
                    "text-sm font-medium",
                    (stock.change ?? 0) >= 0
                      ? "text-success"
                      : "text-destructive"
                  )}>
                    {(stock.change ?? 0) >= 0 ? '+' : ''}
                    {Number(stock.changePercent ?? 0).toFixed(2)}%
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

            </Link>
          ))

        )}

      </div>
    </div>
  );
}
