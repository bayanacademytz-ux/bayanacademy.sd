
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Courses from './components/Courses';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import TrialModal from './components/TrialModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import { translations } from './translations';
import { COURSES as INITIAL_COURSES, PRICING as INITIAL_PRICING } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    const savedRequests = localStorage.getItem('bayan_requests');
    const savedContent = localStorage.getItem('bayan_site_content');

    if (savedRequests) setRequests(JSON.parse(savedRequests));
    
    if (savedContent) {
      setSiteData(JSON.parse(savedContent));
    } else {
      const initialContent = {
        translations: translations,
        courses: INITIAL_COURSES,
        pricing: INITIAL_PRICING,
        whatsapp: '201234567890',
        navLinks: [
          { id: '1', labelAr: 'الرئيسية', labelEn: 'Home', href: '#' },
          { id: '2', labelAr: 'عن الأكاديمية', labelEn: 'About', href: '#about' },
          { id: '3', labelAr: 'مسارات التعلم', labelEn: 'Courses', href: '#courses' },
          { id: '4', labelAr: 'خطط الأسعار', labelEn: 'Pricing', href: '#pricing' },
        ],
        socialLinks: {
          facebook: 'https://www.facebook.com/share/1AnKYbBSu1/',
          instagram: 'https://www.instagram.com/bayanacademysd',
          twitter: 'https://x.com/BayanAcademysd',
          youtube: 'https://www.youtube.com/@BayanAcademysd'
        }
      };
      setSiteData(initialContent);
    }
  }, []);

  useEffect(() => {
    if (siteData) {
      const t = siteData.translations[lang];
      document.documentElement.dir = t.dir;
      document.documentElement.lang = lang;
    }
  }, [lang, siteData]);

  const updateSiteContent = (newData: any) => {
    setSiteData(newData);
    localStorage.setItem('bayan_site_content', JSON.stringify(newData));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const handleLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  if (!siteData) return <div className="h-screen w-screen flex items-center justify-center bg-emerald text-white">Loading Academy...</div>;

  const t = siteData.translations[lang];

  if (isAdmin) {
    return (
      <AdminDashboard 
        lang={lang} 
        requests={requests} 
        onLogout={() => setIsAdmin(false)} 
        onUpdateStatus={(id, status) => {
          const updated = requests.map(r => r.id === id ? { ...r, status } : r);
          setRequests(updated);
          localStorage.setItem('bayan_requests', JSON.stringify(updated));
        }}
        siteData={siteData}
        onUpdateContent={updateSiteContent}
      />
    );
  }

  return (
    <div className={`min-h-screen font-tajawal ${lang === 'en' ? 'text-left' : 'text-right'}`}>
      <Header 
        lang={lang} 
        setLang={setLang} 
        onOpenModal={openModal} 
        onOpenLogin={openLogin}
        siteName={t.siteName}
        navLinks={siteData.navLinks}
        navTranslations={t.nav}
      />
      
      <main>
        <Hero lang={lang} onOpenModal={openModal} content={t.hero} />
        <Stats lang={lang} translations={t.stats} />
        <Features lang={lang} translations={t.features} />
        <Courses lang={lang} courses={siteData.courses} translations={t.courses} />
        <Pricing lang={lang} pricing={siteData.pricing} translations={t.pricing} />
        
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-emerald rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -ml-32 -mb-32"></div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 relative z-10">
                {lang === 'ar' ? 'هل أنت مستعد لتبدأ رحلتك مع كتاب الله؟' : 'Ready to start your journey with the Quran?'}
              </h2>
              <button 
                onClick={openModal}
                className="bg-gold hover:bg-gold-dark text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-2xl transition-all transform hover:scale-105"
              >
                {t.nav.book}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} translations={t.footer} socialLinks={siteData.socialLinks} />
      <TrialModal lang={lang} isOpen={isModalOpen} onClose={closeModal} onSubmit={(data) => {
        const updated = [data, ...requests];
        setRequests(updated);
        localStorage.setItem('bayan_requests', JSON.stringify(updated));
      }} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onLogin={handleLogin} />

      <a 
        href={`https://wa.me/${siteData.whatsapp}`}
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform`}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.5 8.5 0 0 1 8.5 8.9z"></path></svg>
      </a>
    </div>
  );
};

export default App;
