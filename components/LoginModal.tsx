
import React, { useState } from 'react';
import { X, Lock, User, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: string, pass: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      onClose();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-emerald">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-emerald" />
          </div>
          <h2 className="text-2xl font-bold text-emerald">دخول لوحة التحكم</h2>
          <p className="text-gray-500">استخدم بيانات الإدارة للوصول</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center text-sm">
              <AlertCircle className="w-4 h-4 ml-2" />
              {error}
            </div>
          )}
          
          <div className="relative">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="اسم المستخدم"
              className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-emerald outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password"
              placeholder="كلمة المرور"
              className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-emerald outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-emerald hover:bg-emerald-dark text-white py-4 rounded-xl font-bold transition-all">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
