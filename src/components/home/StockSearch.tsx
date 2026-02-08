import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { searchStock } from '@/services/marketData';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

interface StockSearchProps {
  className?: string;
  autoFocus?: boolean;
  size?: 'default' | 'large';
}

export function StockSearch({ className, autoFocus = false, size = 'default' }: StockSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const data = await searchStock(query);

        const mapped: Stock[] = Array.isArray(data)
          ? data.slice(0, 6).map((s: any) => ({
            symbol: s.symbol || s.stock_symbol || s.name,
            name: s.name || s.company_name || s.symbol,
            price: Number(s.price || s.ltp || 0),
            change: Number(s.change || 0),
            changePercent: Number(s.changePercent || s.change_percent || 0),
          }))
          : [{
            symbol: data.symbol || data.name,
            name: data.name || data.symbol,
            price: Number(data.price || data.ltp || 0),
            change: Number(data.change || 0),
            changePercent: Number(data.changePercent || 0),
          }];

        setResults(mapped);
        setIsOpen(mapped.length > 0);
        setSelectedIndex(-1);

      } catch {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (stock: Stock) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/stock/${stock.symbol}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
          size === 'large' ? "w-5 h-5" : "w-4 h-4"
        )} />

        <Input
          ref={inputRef}
          type="text"
          placeholder="Search stocks... (e.g., RELIANCE, TCS)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          autoFocus={autoFocus}
          className={cn(
            "w-full bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all",
            size === 'large'
              ? "h-14 pl-12 pr-4 text-lg rounded-xl"
              : "h-11 pl-10 pr-4 rounded-lg"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-in">
          {results.map((stock, index) => (
            <button
              key={stock.symbol + index}
              onClick={() => handleSelect(stock)}
              className={cn(
                "w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors text-left",
                index === selectedIndex && "bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {stock.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium">₹{stock.price.toLocaleString('en-IN')}</p>
                  <p className={cn(
                    "text-sm",
                    stock.change >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {stock.change >= 0 ? '+' : ''}
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

