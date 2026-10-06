import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Check } from 'lucide-react';

export const Pricing = () => {
  const plans = [
    {
      name: 'Solo Creator',
      price: '$0',
      period: 'Forever free',
      desc: 'Perfect for emerging creators starting their journey.',
      features: [
        'Core Dashboard & Account Settings',
        'Up to 50 Idea Vault Entries',
        'Basic Content Calendar',
        'Creator Portfolio Showcase',
        'Local JSON File Storage'
      ],
      buttonText: 'Get Started Free',
      variant: 'outline'
    },
    {
      name: 'Pro Creator',
      price: '$19',
      period: 'per month',
      desc: 'For active creators managing multiple channels and brand deals.',
      features: [
        'Everything in Free',
        'Unlimited Idea Vault & Scripts',
        'Brand Marketplace Pipeline',
        'Creator Store Digital Downloads',
        'Advanced Growth Analytics',
        'Custom Domain Portfolio'
      ],
      popular: true,
      buttonText: 'Start Pro Trial',
      variant: 'primary'
    },
    {
      name: 'Creator Studio',
      price: '$49',
      period: 'per month',
      desc: 'For established media brands and small creator teams.',
      features: [
        'Everything in Pro',
        'Multi-user Team Collaboration',
        'Finance & Invoicing Engine',
        'Automated Sponsorship Contracts',
        'Priority 24/7 Support'
      ],
      buttonText: 'Contact Studio Team',
      variant: 'outline'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-3">Transparent Pricing</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Simple, Creator-Friendly Pricing</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            No hidden transaction fees. Pick the tier that fits your growth stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <Card key={idx} className={`p-8 flex flex-col justify-between relative ${p.popular ? 'border-2 border-brand-purple shadow-xl' : ''}`}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{p.desc}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{p.price}</span>
                  <span className="text-xs text-slate-500 ml-2">{p.period}</span>
                </div>

                <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link to="/register">
                  <Button variant={p.variant} className="w-full">
                    {p.buttonText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
