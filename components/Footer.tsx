
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  translations: any;
  socialLinks: any;
}

const Footer: React.FC<FooterProps> = ({ lang, translations: t, socialLinks }) => {
  const isAr = lang === 'ar';
  
  return (
    <footer className="bg-emerald-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className={`flex items-center space-x-2 ${isAr ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-emerald font-bold text-2xl">{isAr ? 'ب' : 'B'}</span>
              </div>
              <span className="text-3xl font-bold">{isAr ? 'أكاديمية بيان' : 'Bayan Academy'}</span>
            </div>
            <p className="text-emerald-50 opacity-70 leading-relaxed text-lg">{t.brandDesc}</p>
            <div className={`flex space-x-4 ${isAr ? 'space-x-reverse' : ''}`}>
              {Object.entries(socialLinks).map(([platform, url]) => {
                const Icons: any = { facebook: Facebook, instagram: Instagram, twitter: Twitter, youtube: Youtube };
                const Icon = Icons[platform];
                return (
                  <a key={platform} href={url as string} className="w-10 h-10 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className={`text-xl font-bold mb-8 text-gold border-${isAr ? 'r' : 'l'}-4 border-gold p${isAr ? 'r' : 'l'}-3`}>{t.linksTitle}</h4>
            <ul className="space-y-4 text-emerald-50 opacity-80">
              <li><a href="#" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">{isAr ? 'عن الأكاديمية' : 'About'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xl font-bold mb-8 text-gold border-${isAr ? 'r' : 'l'}-4 border-gold p${isAr ? 'r' : 'l'}-3`}>{t.coursesTitle}</h4>
            <ul className="space-y-4 text-emerald-50 opacity-80">
              <li><a href="#" className="hover:text-gold transition-colors">{isAr ? 'تحفيظ القرآن' : 'Quran Memorization'}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{isAr ? 'اللغة العربية' : 'Arabic Language'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xl font-bold mb-8 text-gold border-${isAr ? 'r' : 'l'}-4 border-gold p${isAr ? 'r' : 'l'}-3`}>{t.contactTitle}</h4>
            <ul className="space-y-6">
              <li className={`flex items-start space-x-4 ${isAr ? 'space-x-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-emerald-50 opacity-80">{t.phone}</span>
              </li>
              <li className={`flex items-start space-x-4 ${isAr ? 'space-x-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-emerald-50 opacity-80">{t.email}</span>
              </li>
              <li className={`flex items-start space-x-4 ${isAr ? 'space-x-reverse' : ''}`}>
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-emerald-50 opacity-80">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 text-center text-sm text-emerald-50 opacity-50">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
