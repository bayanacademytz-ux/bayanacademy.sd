
import React from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle, 
  BookOpen, 
  ShieldCheck, 
  Star, 
  Calendar,
  Layers
} from 'lucide-react';
import { Feature, Course, PricingPlan, Stat } from './types';

export const STATS: Stat[] = [
  { id: 1, label: 'طالب وطالبة', value: '+٥٠٠٠' },
  { id: 2, label: 'معلم مجاز', value: '+١٥٠' },
  { id: 3, label: 'ساعة تعليمية', value: '+١٠٠ ألف' },
  { id: 4, label: 'دولة حول العالم', value: '+٣٠' }
];

export const FEATURES: Feature[] = [
  { 
    id: 1, 
    title: 'معلمون مجازون', 
    description: 'نخبة من الحفاظ والمجازين بالقراءات العشر من الأزهر الشريف.', 
    icon: <ShieldCheck className="w-8 h-8 text-gold" /> 
  },
  { 
    id: 2, 
    title: 'مواعيد مرنة', 
    description: 'اختر الأوقات التي تناسب جدولك اليومي على مدار الساعة.', 
    icon: <Clock className="w-8 h-8 text-gold" /> 
  },
  { 
    id: 3, 
    title: 'مناهج مخصصة', 
    description: 'خطط دراسية فردية تناسب مستواك وقدراتك الاستيعابية.', 
    icon: <Layers className="w-8 h-8 text-gold" /> 
  },
  { 
    id: 4, 
    title: 'تقارير دورية', 
    description: 'متابعة دقيقة لمستوى الطالب مع تقارير أداء شهرية مرسلة للأهل.', 
    icon: <Calendar className="w-8 h-8 text-gold" /> 
  },
  { 
    id: 5, 
    title: 'فصول خاصة للنساء', 
    description: 'خصوصية تامة مع معلمات مجازات متخصصات لتعليم النساء والأطفال.', 
    icon: <Users className="w-8 h-8 text-gold" /> 
  }
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'تصحيح التلاوة',
    level: 'مبتدئ - متقدم',
    description: 'إتقان مخارج الحروف وقواعد التجويد الأساسية برواية حفص عن عاصم.',
    image: 'https://picsum.photos/id/101/600/400'
  },
  {
    id: 2,
    title: 'تحفيظ القرآن الكريم',
    level: 'جميع المستويات',
    description: 'برامج مكثفة وميسرة لحفظ كتاب الله مع المراجعة المستمرة.',
    image: 'https://picsum.photos/id/102/600/400'
  },
  {
    id: 3,
    title: 'القاعدة النورانية',
    level: 'للأطفال والمبتدئين',
    description: 'تأسيس صحيح للقراءة باللغة العربية والقرآن الكريم بأسلوب علمي.',
    image: 'https://picsum.photos/id/103/600/400'
  },
  {
    id: 4,
    title: 'اللغة العربية',
    level: 'لغير الناطقين بها',
    description: 'تعلم مهارات القراءة، الكتابة، والمحادثة باللغة العربية الفصحى.',
    image: 'https://picsum.photos/id/104/600/400'
  },
  {
    id: 5,
    title: 'الدراسات الإسلامية',
    level: 'عام',
    description: 'دروس في الفقه، العقيدة، الحديث، والسيرة النبوية العطرة.',
    image: 'https://picsum.photos/id/105/600/400'
  }
];

export const PRICING: PricingPlan[] = [
  {
    id: 1,
    name: 'الخطة البرونزية',
    price: '$٤٥ / شهر',
    features: ['٨ حصص شهرياً', 'حصة لمدة ٣٠ دقيقة', 'معلم واحد ثابت', 'تقرير شهري'],
  },
  {
    id: 2,
    name: 'الخطة الفضية',
    price: '$٧٥ / شهر',
    features: ['١٢ حصة شهرياً', 'حصة لمدة ٤٥ دقيقة', 'أولوية في اختيار المواعيد', 'تقرير نصف شهري'],
    recommended: true
  },
  {
    id: 3,
    name: 'الخطة الذهبية',
    price: '$١٢٠ / شهر',
    features: ['٢٠ حصة شهرياً', 'حصة لمدة ٦٠ دقيقة', 'دعم فني ٢٤/٧', 'شهادة إتمام معتمدة'],
  }
];
