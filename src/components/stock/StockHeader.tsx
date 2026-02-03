import { ArrowLeft, TrendingUp, TrendingDown, Building2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Stock } from '@/data/mockStocks';
import { cn } from '@/lib/utils';

interface StockHeaderProps {
  stock: Stock;
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isPositive = stock.change >= 0;

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{stock.symbol}</h1>
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium text-muted-foreground">
                    {stock.exchange}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{stock.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{stock.sector}</span>
              <span>•</span>
              <span>{stock.industry}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-3xl font-bold text-foreground">
              ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={cn(
                "font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <Button variant="glass" size="icon" className="hidden sm:flex">
            <Star className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
