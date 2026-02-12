
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileEdit, 
  Users, 
  LogOut, 
  Search, 
  Bell,
  Save,
  Globe,
  Layout,
  Type,
  Phone,
  List,
  ExternalLink,
  Plus,
  Trash2,
  // Fix: Added Clock icon to imports as it is used for the saving spinner
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  lang: 'ar' | 'en';
  requests: any[];
  onLogout: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  siteData: any;
  onUpdateContent: (data: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  lang, requests, onLogout, onUpdateStatus, siteData, onUpdateContent 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editorSection, setEditorSection] = useState('general');
  const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(siteData)));
  const [isSaving, setIsSaving] = useState(false);

  const isAr = lang === 'ar';
  const t = localData.translations[lang].admin;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateContent(localData);
      setIsSaving(false);
      alert(isAr ? 'تم حفظ التعديلات بنجاح!' : 'Changes saved successfully!');
    }, 800);
  };

  const updateTranslationField = (language: 'ar' | 'en', section: string, field: string, value: string) => {
    const newData = { ...localData };
    newData.translations[language][section][field] = value;
    setLocalData(newData);
  };

  const addNavLink = () => {
    const newData = { ...localData };
    newData.navLinks.push({ id: Date.now().toString(), labelAr: 'رابط جديد', labelEn: 'New Link', href: '#' });
    setLocalData(newData);
  };

  const removeNavLink = (id: string) => {
    const newData = { ...localData };
    newData.navLinks = newData.navLinks.filter((l: any) => l.id !== id);
    setLocalData(newData);
  };

  const NavItem = ({ id, label, icon: Icon }: any) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center space-x-3 ${isAr ? 'space-x-reverse' : ''} px-6 py-4 transition-all ${activeTab === id ? 'bg-white/10 text-gold border-gold border-r-4' : 'text-white/60 hover:text-white'}`}>
      <Icon className="w-5 h-5" />
      <span className="font-bold">{label}</span>
    </button>
  );

  return (
    <div className={`flex h-screen bg-gray-100 font-tajawal overflow-hidden ${isAr ? 'text-right' : 'text-left'}`} dir={localData.translations[lang].dir}>
      <aside className="w-64 bg-emerald-dark text-white flex flex-col shrink-0">
        <div className="p-8 border-b border-white/10 font-bold text-lg">{t.title}</div>
        <nav className="flex-1 mt-6">
          <NavItem id="dashboard" label={t.dashboard} icon={LayoutDashboard} />
          <NavItem id="requests" label={t.requests} icon={MessageSquare} />
          <NavItem id="content" label={t.content} icon={FileEdit} />
        </nav>
        <div className="p-6">
          <button onClick={onLogout} className="w-full bg-red-500/10 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center space-x-2">
            <LogOut className="w-5 h-5" /><span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white h-20 flex items-center justify-between px-8 border-b">
          <div className="font-bold text-xl">{isAr ? 'لوحة التحكم المركزية' : 'Central CMS Panel'}</div>
          {activeTab === 'content' && (
            <button onClick={handleSave} className="bg-gold text-white px-8 py-2.5 rounded-xl font-bold flex items-center shadow-lg">
              {/* Fix: Use Clock icon for loading state animation */}
              {isSaving ? <Clock className="animate-spin ml-2 w-4 h-4" /> : <Save className="ml-2 w-4 h-4" />}
              {isAr ? 'حفظ التعديلات' : 'Save All Changes'}
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'content' && (
            <div className="flex gap-8 h-full">
              <div className="w-64 shrink-0 space-y-2">
                {[
                  { id: 'general', label: isAr ? 'الهوية والاتصال' : 'Global & WhatsApp', icon: Globe },
                  { id: 'navigation', label: isAr ? 'إدارة القوائم' : 'Navigation Menu', icon: List },
                  { id: 'hero', label: isAr ? 'الواجهة الرئيسية' : 'Hero Section', icon: Layout },
                  { id: 'footer', label: isAr ? 'تذييل الصفحة' : 'Footer Content', icon: ExternalLink },
                ].map(item => (
                  <button key={item.id} onClick={() => setEditorSection(item.id)} className={`w-full flex items-center space-x-3 ${isAr ? 'space-x-reverse' : ''} px-4 py-3 rounded-xl ${editorSection === item.id ? 'bg-white shadow-sm font-bold text-emerald' : 'text-gray-500'}`}>
                    <item.icon className="w-5 h-5" /><span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-3xl p-8 border shadow-sm space-y-8 overflow-y-auto">
                {editorSection === 'general' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-4">{isAr ? 'بيانات التواصل الأساسية' : 'Global Identity'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">WhatsApp Number (e.g. 201234567890)</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.whatsapp} onChange={e => setLocalData({...localData, whatsapp: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">{isAr ? 'اسم الموقع' : 'Site Name'}</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations[lang].siteName} onChange={e => {
                          const nd = {...localData}; nd.translations.ar.siteName = e.target.value; nd.translations.en.siteName = e.target.value; setLocalData(nd);
                        }} />
                      </div>
                    </div>
                  </div>
                )}

                {editorSection === 'navigation' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-xl font-bold">{isAr ? 'روابط القائمة العلوية' : 'Header Menu Links'}</h3>
                      <button onClick={addNavLink} className="bg-emerald text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center"><Plus className="w-4 h-4 ml-1" />{isAr ? 'إضافة رابط' : 'Add Link'}</button>
                    </div>
                    {localData.navLinks.map((link: any, idx: number) => (
                      <div key={link.id} className="p-4 bg-gray-50 rounded-2xl border flex items-center gap-4">
                        <input type="text" placeholder="Arabic" className="flex-1 p-2 rounded-lg border" value={link.labelAr} onChange={e => {
                          const nd = {...localData}; nd.navLinks[idx].labelAr = e.target.value; setLocalData(nd);
                        }} />
                        <input type="text" placeholder="English" className="flex-1 p-2 rounded-lg border" value={link.labelEn} onChange={e => {
                          const nd = {...localData}; nd.navLinks[idx].labelEn = e.target.value; setLocalData(nd);
                        }} />
                        <input type="text" placeholder="URL/ID" className="w-32 p-2 rounded-lg border" value={link.href} onChange={e => {
                          const nd = {...localData}; nd.navLinks[idx].href = e.target.value; setLocalData(nd);
                        }} />
                        <button onClick={() => removeNavLink(link.id)} className="text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                )}

                {editorSection === 'footer' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-4">{isAr ? 'بيانات التذييل' : 'Footer & Contact CMS'}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold mb-2">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations[lang].footer.phone} onChange={e => updateTranslationField(lang, 'footer', 'phone', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations[lang].footer.email} onChange={e => updateTranslationField(lang, 'footer', 'email', e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold mb-2">{isAr ? 'العنوان' : 'Full Address'}</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations[lang].footer.address} onChange={e => updateTranslationField(lang, 'footer', 'address', e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold mb-2">{isAr ? 'حقوق النشر' : 'Copyright Text'}</label>
                        <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations[lang].footer.copyright} onChange={e => updateTranslationField(lang, 'footer', 'copyright', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}
                
                {editorSection === 'hero' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-4">{isAr ? 'تعديل قسم البانر العلوي' : 'Hero Section Editor'}</h3>
                    <div className="space-y-4">
                      <label className="block font-bold">Arabic Title</label>
                      <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations.ar.hero.title} onChange={e => updateTranslationField('ar', 'hero', 'title', e.target.value)} />
                      <label className="block font-bold">English Title</label>
                      <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl" value={localData.translations.en.hero.title} onChange={e => updateTranslationField('en', 'hero', 'title', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'dashboard' && <div className="p-20 text-center text-gray-400">Welcome to Bayan Academy CMS</div>}
          {activeTab === 'requests' && (
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-gray-50"><tr><th className="p-4">Student</th><th className="p-4">Status</th></tr></thead>
                  <tbody>{requests.map(r => <tr key={r.id} className="border-t"><td className="p-4">{r.name}</td><td className="p-4">{r.status}</td></tr>)}</tbody>
               </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
