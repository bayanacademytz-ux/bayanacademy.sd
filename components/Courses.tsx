
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CoursesProps {
  lang: 'ar' | 'en';
  courses: any[];
  translations: any;
}

const Courses: React.FC<CoursesProps> = ({ lang, courses, translations: t }) => {
  const isAr = lang === 'ar';

  return (
    <section id="courses" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 ${isAr ? '' : 'md:flex-row-reverse'}`}>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald mb-4">
              {t.title}
            </h2>
            <div className={`w-24 h-1 bg-gold rounded-full mb-4 ${isAr ? '' : 'mr-auto'}`}></div>
            <p className="text-gray-600 max-w-xl text-lg">
              {t.desc}
            </p>
          </div>
          <button className={`hidden md:flex items-center text-emerald font-bold hover:text-gold transition-colors mt-6 md:mt-0 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
            {t.viewAll}
            {isAr ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-emerald text-white px-4 py-1 rounded-full text-sm font-medium`}>
                  {course.level}
                </div>
              </div>
              <div className={`p-8 ${isAr ? 'text-right' : 'text-left'}`}>
                <h3 className="text-2xl font-bold text-emerald mb-3">
                  {isAr ? course.title : course.title.replace('تحفيظ', 'Quran Memorization').replace('تصحيح', 'Recitation Correction').replace('اللغة العربية', 'Arabic Language').replace('الدراسات الإسلامية', 'Islamic Studies').replace('القاعدة النورانية', 'Nooraniah Foundation')}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {isAr ? course.description : 'A professional program designed to take you from beginner to advanced levels with certified instructors.'}
                </p>
                <button className="w-full py-3 rounded-xl border-2 border-emerald text-emerald font-bold hover:bg-emerald hover:text-white transition-all">
                  {t.details}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
