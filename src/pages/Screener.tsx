import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { stocks, Stock } from '@/data/mockStocks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Filter, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Screener() {
  const [peRange, setPeRange] = useState<[number, number]>([0, 100]);
  const [marketCapFilter, setMarketCapFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap');

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(stocks.map(s => s.sector))];
    return uniqueSectors.sort();
  }, []);

  const filteredStocks = useMemo(() => {
    let result = [...stocks];

    // PE Filter
    result = result.filter(s => s.pe >= peRange[0] && s.pe <= peRange[1]);

    // Market Cap Filter
    if (marketCapFilter === 'large') result = result.filter(s => s.marketCap >= 100000);
    else if (marketCapFilter === 'mid') result = result.filter(s => s.marketCap >= 20000 && s.marketCap < 100000);
    else if (marketCapFilter === 'small') result = result.filter(s => s.marketCap < 20000);

    // Sector Filter
    if (sectorFilter !== 'all') result = result.filter(s => s.sector === sectorFilter);

    // Sort
    if (sortBy === 'marketCap') result.sort((a, b) => b.marketCap - a.marketCap);
    else if (sortBy === 'pe') result.sort((a, b) => a.pe - b.pe);
    else if (sortBy === 'change') result.sort((a, b) => b.changePercent - a.changePercent);
    else if (sortBy === 'price') result.sort((a, b) => b.price - a.price);

    return result;
  }, [peRange, marketCapFilter, sectorFilter, sortBy]);

  const resetFilters = () => {
    setPeRange([0, 100]);
    setMarketCapFilter('all');
    setSectorFilter('all');
    setSortBy('marketCap');
  };

  const getRiskLevel = (stock: Stock) => {
    if (stock.pe < 15 && stock.marketCap > 50000) return { level: 'Low', color: 'success' };
    if (stock.pe > 50 || stock.marketCap < 10000) return { level: 'High', color: 'destructive' };
    return { level: 'Medium', color: 'warning' };
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Stock Screener</h1>
              <p className="text-muted-foreground">Filter and find stocks that match your criteria</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Filters</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* PE Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    P/E Ratio: {peRange[0]} - {peRange[1]}
                  </label>
                  <Slider
                    value={peRange}
                    onValueChange={(value) => setPeRange(value as [number, number])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Market Cap */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Market Cap
                  </label>
                  <Select value={marketCapFilter} onValueChange={setMarketCapFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select market cap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Caps</SelectItem>
                      <SelectItem value="large">Large Cap (₹1L Cr+)</SelectItem>
                      <SelectItem value="mid">Mid Cap (₹20K-1L Cr)</SelectItem>
                      <SelectItem value="small">Small Cap (&lt;₹20K Cr)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sector */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sector
                  </label>
                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketCap">Market Cap</SelectItem>
                      <SelectItem value="pe">P/E Ratio</SelectItem>
                      <SelectItem value="change">% Change</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredStocks.length}</span> stocks match your criteria
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {filteredStocks.map((stock) => {
                const risk = getRiskLevel(stock);
                return (
                  <Link
                    key={stock.symbol}
                    to={`/stock/${stock.symbol}`}
                    className="glass-card-hover p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                        {stock.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {stock.symbol}
                          </h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-xs font-medium",
                            risk.color === 'success' && "bg-success/10 text-success",
                            risk.color === 'warning' && "bg-warning/10 text-warning",
                            risk.color === 'destructive' && "bg-destructive/10 text-destructive"
                          )}>
                            {risk.level} Risk
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{stock.sector}</span>
                          <span>•</span>
                          <span>PE: {stock.pe.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ₹{stock.price.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center justify-end gap-1">
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-success" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-destructive" />
                          )}
                          <span className={cn(
                            "text-sm font-medium",
                            stock.change >= 0 ? "text-success" : "text-destructive"
                          )}>
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}

              {filteredStocks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No stocks match your criteria. Try adjusting the filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
