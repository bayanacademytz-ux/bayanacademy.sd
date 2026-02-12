
import React from 'react';
import { FEATURES } from '../constants';

interface FeaturesProps {
  lang: 'ar' | 'en';
  translations: any;
}

const Features: React.FC<FeaturesProps> = ({ lang, translations: t }) => {
  const getFeatureTitle = (id: number) => {
    const titlesAr = ['', 'معلمون مجازون', 'مواعيد مرنة', 'مناهج مخصصة', 'تقارير دورية', 'فصول خاصة للنساء'];
    const titlesEn = ['', 'Certified Teachers', 'Flexible Timings', 'Customized Curriculum', 'Periodic Reports', 'Private Female Classes'];
    return lang === 'ar' ? titlesAr[id] : titlesEn[id];
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-emerald/5 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald mb-3">
                {getFeatureTitle(feature.id)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {lang === 'ar' ? feature.description : 'Professional excellence tailored for your success in learning.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
