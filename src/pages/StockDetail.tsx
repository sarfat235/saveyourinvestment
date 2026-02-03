import { useParams, Link } from 'react-router-dom';
import { getStockBySymbol } from '@/data/mockStocks';
import { StockHeader } from '@/components/stock/StockHeader';
import { StockMetrics } from '@/components/stock/StockMetrics';
import { PriceChart } from '@/components/stock/PriceChart';
import { AnalysisSection } from '@/components/stock/AnalysisSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const stock = symbol ? getStockBySymbol(symbol) : undefined;

  if (!stock) {
    return (
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <SearchX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Stock Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find a stock with symbol "{symbol}". Please check the symbol and try again.
            </p>
            <Link to="/">
              <Button variant="hero" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <StockHeader stock={stock} />
        <StockMetrics stock={stock} />
        <PriceChart stock={stock} />
        <AnalysisSection stock={stock} />
      </div>
    </main>
  );
}
