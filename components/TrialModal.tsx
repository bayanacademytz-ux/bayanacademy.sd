
import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    age: '',
    course: 'قرآن كريم'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'رقم الواتساب مطلوب';
    if (!formData.age.trim()) newErrors.age = 'العمر مطلوب';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        date: new Date().toLocaleDateString('ar-EG'),
        status: 'pending'
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', whatsapp: '', age: '', course: 'قرآن كريم' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-emerald transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald">احجز حصتك التجريبية مجاناً</h2>
                <p className="text-gray-500 mt-2">ابدأ أولى خطواتك في رحلة تعلم كتاب الله</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="أدخل اسمك بالكامل"
                    className={`w-full px-5 py-3 rounded-xl border-2 focus:border-emerald outline-none transition-all ${
                      errors.name ? 'border-red-400' : 'border-gray-100 bg-gray-50'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">رقم الواتساب</label>
                    <input 
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      placeholder="+966xxxxxxxxx"
                      className={`w-full px-5 py-3 rounded-xl border-2 focus:border-emerald outline-none transition-all ${
                        errors.whatsapp ? 'border-red-400' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                    {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">العمر</label>
                    <input 
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="مثلاً: ٢٥"
                      className={`w-full px-5 py-3 rounded-xl border-2 focus:border-emerald outline-none transition-all ${
                        errors.age ? 'border-red-400' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نوع الدورة</label>
                  <select 
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-emerald outline-none transition-all appearance-none"
                  >
                    <option>قرآن كريم</option>
                    <option>لغة عربية</option>
                    <option>قاعدة نورانية</option>
                    <option>دراسات إسلامية</option>
                  </select>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-emerald hover:bg-emerald-dark text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald/20 transition-all flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>إرسال الطلب</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12 px-6">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-20 h-20 text-emerald animate-bounce" />
              </div>
              <h2 className="text-3xl font-bold text-emerald mb-4">تم استلام طلبك!</h2>
              <p className="text-gray-600 text-lg">
                شكراً لثقتك بنا. سيتواصل معك فريقنا المختص عبر الواتساب خلال الـ ٢٤ ساعة القادمة لتحديد موعد حصتك المجانية.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialModal;
