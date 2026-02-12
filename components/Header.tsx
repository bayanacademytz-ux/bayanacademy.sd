
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  onOpenModal: () => void;
  onOpenLogin: () => void;
  siteName: string;
  navLinks: any[];
  navTranslations: any;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenModal, onOpenLogin, siteName, navLinks, navTranslations: t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className={`container mx-auto px-6 flex justify-between items-center ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex items-center space-x-2 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
          <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
            <span className="text-gold font-bold text-xl">{lang === 'ar' ? 'ب' : 'B'}</span>
          </div>
          <span className={`text-2xl font-bold ${isScrolled ? 'text-emerald' : 'text-white'}`}>
            {siteName}
          </span>
        </div>

        <nav className={`hidden md:flex items-center space-x-6 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-medium hover:text-gold transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {lang === 'ar' ? link.labelAr : link.labelEn}
            </a>
          ))}
          
          <div className={`flex items-center space-x-3 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`px-3 py-2 rounded-lg font-bold transition-all border ${isScrolled ? 'border-gray-200 text-gray-700' : 'border-white/20 text-white'} hover:bg-gold hover:text-white`}
            >
              <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
            </button>
            <button onClick={onOpenLogin} className={`px-4 py-2 rounded-full font-bold ${isScrolled ? 'text-emerald' : 'text-white'}`}>
              <LogIn className="w-4 h-4" />
            </button>
            <button onClick={onOpenModal} className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-full font-bold shadow-lg">
              {t.book}
            </button>
          </div>
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={isScrolled ? 'text-emerald' : 'text-white'} /> : <Menu className={isScrolled ? 'text-emerald' : 'text-white'} />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-emerald-dark transition-transform duration-300 transform md:hidden ${isMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')} z-40 pt-24 px-6`}>
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-white text-xl font-medium">{lang === 'ar' ? link.labelAr : link.labelEn}</a>
          ))}
          <button onClick={() => { setIsMenuOpen(false); onOpenModal(); }} className="bg-gold text-white py-4 rounded-xl font-bold">{t.book}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
