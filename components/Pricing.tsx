
import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  lang: 'ar' | 'en';
  pricing: any[];
  translations: any;
}

const Pricing: React.FC<PricingProps> = ({ lang, pricing, translations: t }) => {
  const handleBuy = (planName: string) => {
    const message = `السلام عليكم، أرغب في الاشتراك في ${planName} من أكاديمية بيان.`;
    window.open(`https://wa.me/201234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white p-10 rounded-3xl shadow-xl transition-all hover:-translate-y-3 ${
                plan.recommended ? 'ring-4 ring-gold border-gold' : 'border border-gray-100'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  {t.recommended}
                </div>
              )}
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-emerald mb-4">{plan.name}</h3>
                <div className="text-4xl font-extrabold text-emerald">
                  {plan.price}
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Check className={`w-5 h-5 text-gold ${lang === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleBuy(plan.name)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.recommended 
                    ? 'bg-gold text-white hover:bg-gold-dark shadow-gold/20 shadow-xl' 
                    : 'bg-emerald text-white hover:bg-emerald-dark'
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
