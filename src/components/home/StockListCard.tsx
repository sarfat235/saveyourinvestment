import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '@/data/mockStocks';
import { cn } from '@/lib/utils';

interface StockListCardProps {
  title: string;
  stocks: Stock[];
  type: 'gainers' | 'losers';
}

export function StockListCard({ title, stocks, type }: StockListCardProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className={cn(
        "px-5 py-4 border-b border-border/50",
        type === 'gainers' ? "bg-success/5" : "bg-destructive/5"
      )}>
        <div className="flex items-center gap-2">
          {type === 'gainers' ? (
            <TrendingUp className="w-5 h-5 text-success" />
          ) : (
            <TrendingDown className="w-5 h-5 text-destructive" />
          )}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      <div className="divide-y divide-border/50">
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            className="flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                {stock.symbol.slice(0, 2)}
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
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-foreground">
                  ₹{stock.price.toLocaleString('en-IN')}
                </p>
                <p className={cn(
                  "text-sm font-medium",
                  stock.change >= 0 ? "text-success" : "text-destructive"
                )}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
