import { Shield, Target, Users, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Helping Indian Investors<br />
            <span className="gradient-text">Protect & Grow</span> Their Money
          </h1>
          <p className="text-lg text-muted-foreground">
            We believe every retail investor deserves access to professional-grade analysis tools. 
            Our mission is to democratize stock market analysis in India.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To empower retail investors with clean, understandable data visualization and analysis tools, helping them make informed investment decisions.',
            },
            {
              icon: Users,
              title: 'Who We Serve',
              description: 'Indian retail investors who want to understand their investments better, from beginners learning the basics to experienced traders seeking efficiency.',
            },
            {
              icon: BarChart3,
              title: 'What We Offer',
              description: 'Free access to fundamental analysis, technical indicators, price charts, and stock screening tools for NSE and BSE listed companies.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 border-warning/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Important Disclaimer</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">For Educational Purposes Only:</strong> The information 
                    provided on this website is for educational and informational purposes only. It should not 
                    be considered as financial advice.
                  </p>
                  <p>
                    <strong className="text-foreground">No Investment Advice:</strong> We do not provide 
                    personalized investment recommendations. All investment decisions should be made based 
                    on your own research and consultation with a qualified financial advisor.
                  </p>
                  <p>
                    <strong className="text-foreground">Market Risks:</strong> Stock market investments are 
                    subject to market risks. Past performance is not indicative of future results. You may 
                    lose some or all of your invested capital.
                  </p>
                  <p>
                    <strong className="text-foreground">Data Accuracy:</strong> While we strive to provide 
                    accurate data, we cannot guarantee the accuracy, completeness, or timeliness of the 
                    information displayed. Always verify data from official sources before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/">
              <Button variant="hero" size="xl" className="gap-2">
                <TrendingUp className="w-5 h-5" />
                Start Analyzing Stocks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
