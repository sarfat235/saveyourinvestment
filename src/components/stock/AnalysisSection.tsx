import { Stock } from '@/data/mockStocks';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisSectionProps {
  stock: Stock;
}

interface IndicatorProps {
  label: string;
  value: string;
  status: 'bullish' | 'bearish' | 'neutral';
  description?: string;
}

function Indicator({ label, value, status, description }: IndicatorProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          status === 'bullish' && "bg-success/10",
          status === 'bearish' && "bg-destructive/10",
          status === 'neutral' && "bg-warning/10"
        )}>
          {status === 'bullish' && <TrendingUp className="w-4 h-4 text-success" />}
          {status === 'bearish' && <TrendingDown className="w-4 h-4 text-destructive" />}
          {status === 'neutral' && <AlertTriangle className="w-4 h-4 text-warning" />}
        </div>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="text-right">
        <span className={cn(
          "px-2 py-1 rounded-md text-sm font-medium",
          status === 'bullish' && "bg-success/10 text-success",
          status === 'bearish' && "bg-destructive/10 text-destructive",
          status === 'neutral' && "bg-warning/10 text-warning"
        )}>
          {value}
        </span>
      </div>
    </div>
  );
}

export function AnalysisSection({ stock }: AnalysisSectionProps) {
  // Generate analysis based on stock metrics
  const rsi = Math.random() * 100;
  const rsiStatus = rsi < 30 ? 'bullish' : rsi > 70 ? 'bearish' : 'neutral';
  
  const peStatus = stock.pe < 20 ? 'bullish' : stock.pe > 40 ? 'bearish' : 'neutral';
  const priceVs52wHigh = ((stock.price - stock.weekHigh52) / stock.weekHigh52) * 100;
  const priceStatus = priceVs52wHigh > -10 ? 'bullish' : priceVs52wHigh < -30 ? 'bearish' : 'neutral';
  
  const volumeRatio = stock.volume / stock.avgVolume;
  const volumeStatus = volumeRatio > 1.5 ? 'bullish' : volumeRatio < 0.5 ? 'bearish' : 'neutral';

  const overallScore = [rsiStatus, peStatus, priceStatus, volumeStatus].filter(s => s === 'bullish').length;
  const overallRating = overallScore >= 3 ? 'Good' : overallScore >= 2 ? 'Fair' : 'Risky';
  const overallColor = overallScore >= 3 ? 'success' : overallScore >= 2 ? 'warning' : 'destructive';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fundamental Analysis */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Fundamental Analysis</h3>
        </div>
        
        <div className="space-y-3">
          <Indicator 
            label="P/E Ratio" 
            value={stock.pe < 20 ? 'Undervalued' : stock.pe > 40 ? 'Overvalued' : 'Fair Value'}
            status={peStatus}
            description={`PE: ${stock.pe.toFixed(2)} | Industry avg: ~25`}
          />
          <Indicator 
            label="Price vs 52W High" 
            value={`${priceVs52wHigh.toFixed(1)}%`}
            status={priceStatus}
            description={`Near ${priceVs52wHigh > -10 ? 'high' : priceVs52wHigh < -30 ? 'low' : 'mid'} range`}
          />
          <Indicator 
            label="Market Cap" 
            value={stock.marketCap > 100000 ? 'Large Cap' : stock.marketCap > 20000 ? 'Mid Cap' : 'Small Cap'}
            status={stock.marketCap > 50000 ? 'bullish' : 'neutral'}
            description={`₹${(stock.marketCap / 1000).toFixed(2)}K Cr`}
          />
        </div>

        {/* Overall Rating */}
        <div className={cn(
          "mt-4 p-4 rounded-lg border",
          overallColor === 'success' && "bg-success/5 border-success/20",
          overallColor === 'warning' && "bg-warning/5 border-warning/20",
          overallColor === 'destructive' && "bg-destructive/5 border-destructive/20"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {overallColor === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
              {overallColor === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
              {overallColor === 'destructive' && <XCircle className="w-5 h-5 text-destructive" />}
              <span className="font-medium text-foreground">Fundamental Rating</span>
            </div>
            <span className={cn(
              "font-bold",
              overallColor === 'success' && "text-success",
              overallColor === 'warning' && "text-warning",
              overallColor === 'destructive' && "text-destructive"
            )}>
              {overallRating}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Technical Indicators</h3>
        </div>
        
        <div className="space-y-3">
          <Indicator 
            label="RSI (14)" 
            value={rsi < 30 ? 'Oversold' : rsi > 70 ? 'Overbought' : 'Neutral'}
            status={rsiStatus}
            description={`Current: ${rsi.toFixed(1)}`}
          />
          <Indicator 
            label="MACD" 
            value={stock.change >= 0 ? 'Bullish' : 'Bearish'}
            status={stock.change >= 0 ? 'bullish' : 'bearish'}
            description="Signal line crossover"
          />
          <Indicator 
            label="Volume" 
            value={volumeRatio > 1.5 ? 'High' : volumeRatio < 0.5 ? 'Low' : 'Normal'}
            status={volumeStatus}
            description={`${(volumeRatio * 100).toFixed(0)}% of avg volume`}
          />
          <Indicator 
            label="Moving Average" 
            value={stock.price > stock.weekLow52 * 1.1 ? 'Above 50 DMA' : 'Below 50 DMA'}
            status={stock.price > stock.weekLow52 * 1.1 ? 'bullish' : 'bearish'}
            description="50-day moving average"
          />
        </div>
      </div>

      {/* Investment Summary */}
      <div className="lg:col-span-2 glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">💡 Investment Summary</h3>
        <div className="prose prose-sm prose-invert max-w-none">
          <p className="text-muted-foreground">
            <strong className="text-foreground">{stock.name}</strong> is currently trading at ₹{stock.price.toLocaleString('en-IN')}, 
            {stock.change >= 0 ? ' up ' : ' down '} 
            {Math.abs(stock.changePercent).toFixed(2)}% today.
          </p>
          <p className="text-muted-foreground mt-2">
            {stock.pe < 20 
              ? `With a PE ratio of ${stock.pe.toFixed(2)}, the stock appears undervalued compared to the industry average. This could present a buying opportunity for long-term investors.`
              : stock.pe > 40 
              ? `The PE ratio of ${stock.pe.toFixed(2)} suggests the stock is trading at a premium. Consider waiting for a better entry point.`
              : `The PE ratio of ${stock.pe.toFixed(2)} is fairly valued. The stock is trading near its intrinsic value.`
            }
          </p>
          <p className="text-muted-foreground mt-2">
            {priceVs52wHigh > -10 
              ? 'The stock is near its 52-week high, showing strong momentum but limited upside in the short term.'
              : priceVs52wHigh < -30 
              ? 'Trading significantly below its 52-week high, this could be a value opportunity if fundamentals remain strong.'
              : 'Currently in the mid-range of its 52-week trading band.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
