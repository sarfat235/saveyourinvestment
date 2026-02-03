import { ArrowDown, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StockSearch } from './StockSearch';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Indian Stock Market Analysis</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-foreground">Analyze Before You Invest</span>
            <br />
            <span className="gradient-text">Save Your Investment</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in delay-100">
            Empowering retail investors with clean data visualization, fundamental analysis, 
            and simple explanations. Make smarter decisions in the NSE & BSE markets.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10 animate-fade-in delay-200" id="search">
            <StockSearch size="large" autoFocus />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in delay-300">
            <Link to="/screener">
              <Button variant="hero" size="xl" className="gap-2">
                <BarChart3 className="w-5 h-5" />
                Stock Screener
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="heroOutline" size="xl" className="gap-2">
                <TrendingUp className="w-5 h-5" />
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in delay-400">
            {[
              { label: 'NSE Stocks', value: '2000+' },
              { label: 'Live Data', value: 'Real-time' },
              { label: 'Analysis', value: 'Free' },
              { label: 'Exchange', value: 'NSE/BSE' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
