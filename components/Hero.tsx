
import React from 'react';

interface HeroProps {
  lang: 'ar' | 'en';
  onOpenModal: () => void;
  content: any;
}

const Hero: React.FC<HeroProps> = ({ lang, onOpenModal, content: t }) => {
  const highlight = lang === 'ar' ? 'يتقن' : 'masters';
  
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1584281729215-629671f1f7d3?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      <div className={`container mx-auto px-6 relative z-10 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
        <div className={`max-w-3xl ${lang === 'en' ? 'ml-0' : 'mr-auto'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            {lang === 'ar' ? (
              <>نورٌ وهدى.. لجيلٍ <span className="text-gold italic">{highlight}</span> كتاب الله</>
            ) : (
              <>{t.title.split(highlight)[0]} <span className="text-gold italic">{highlight}</span> {t.title.split(highlight)[1]}</>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 mb-10 leading-relaxed opacity-90">
            {t.desc}
          </p>
          <div className={`flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 ${lang === 'ar' ? 'md:space-x-reverse justify-end' : 'justify-start'} `}>
            <button 
              onClick={onOpenModal}
              className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full font-bold text-xl shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {t.start}
            </button>
            <a 
              href="#courses"
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-xl transition-all text-center"
            >
              {t.browse}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
