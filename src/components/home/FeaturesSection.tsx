import { BarChart3, Shield, TrendingUp, Search, PieChart, Zap } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Stock Search',
    description: 'Instantly find any NSE/BSE listed stock with our powerful autocomplete search.',
  },
  {
    icon: BarChart3,
    title: 'Technical Analysis',
    description: 'View RSI, MACD, Moving Averages and other key indicators at a glance.',
  },
  {
    icon: PieChart,
    title: 'Fundamental Data',
    description: 'Access PE ratios, EPS, market cap and other essential metrics easily.',
  },
  {
    icon: TrendingUp,
    title: 'Price Charts',
    description: 'Interactive price charts with multiple timeframes from 1D to 1Y.',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Get clear risk indicators and investment recommendations.',
  },
  {
    icon: Zap,
    title: 'Fast & Free',
    description: 'Lightning-fast performance with no subscription required.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Analyze
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive tools designed for retail investors to make informed decisions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="glass-card-hover p-6 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
