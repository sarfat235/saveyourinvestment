import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { Stock, generatePriceHistory } from '@/data/mockStocks';
import { cn } from '@/lib/utils';

interface PriceChartProps {
  stock: Stock;
}

const timeframes = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
];

export function PriceChart({ stock }: PriceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  
  const fullData = useMemo(() => generatePriceHistory(stock, 365), [stock]);
  
  const data = useMemo(() => {
    const tf = timeframes.find(t => t.label === selectedTimeframe);
    if (!tf) return fullData;
    return fullData.slice(-tf.days);
  }, [fullData, selectedTimeframe]);

  const priceChange = data.length > 1 ? data[data.length - 1].close - data[0].close : 0;
  const isPositive = priceChange >= 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-foreground">₹{payload[0].value.toLocaleString('en-IN')}</p>
          {payload[1] && (
            <p className="text-xs text-muted-foreground">Vol: {(payload[1].value / 100000).toFixed(2)}L</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Price Chart</h3>
          <p className={cn(
            "text-sm",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{((priceChange / data[0]?.close || 1) * 100).toFixed(2)}%) in {selectedTimeframe}
          </p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary rounded-lg">
          {timeframes.map((tf) => (
            <Button
              key={tf.label}
              variant={selectedTimeframe === tf.label ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeframe(tf.label)}
              className={cn(
                "text-xs px-3",
                selectedTimeframe === tf.label && "shadow-sm"
              )}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 84%, 60%)"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 84%, 60%)"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (selectedTimeframe === '1D') return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
              }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 50', 'dataMax + 50']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 84%, 60%)"}
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="volume" 
              fill="hsl(222, 30%, 35%)" 
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
