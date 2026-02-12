
import React from 'react';

interface StatsProps {
  lang: 'ar' | 'en';
  translations: any;
}

const Stats: React.FC<StatsProps> = ({ lang, translations: t }) => {
  const statsData = [
    { label: t.students, value: lang === 'ar' ? '+٥٠٠٠' : '5000+' },
    { label: t.teachers, value: lang === 'ar' ? '+١٥٠' : '150+' },
    { label: t.hours, value: lang === 'ar' ? '+١٠٠ ألف' : '100K+' },
    { label: t.countries, value: lang === 'ar' ? '+٣٠' : '30+' }
  ];

  return (
    <div className="bg-emerald py-12 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-extrabold text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-lg md:text-xl font-medium opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
