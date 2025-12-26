
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Home, 
  Car, 
  Warehouse, 
  Tent, 
  Layers, 
  ArrowLeft,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Language, translations } from '../lib/translations';

const services = [
  {
    id: 1,
    title_ar: "مظلات سيارات حديثة",
    title_en: "Modern Car Shades",
    desc_ar: "تركيب مظلات بولي إيثيلين و PVC عالي الكثافة، مقاومة للحرارة والأشعة فوق البنفسجية في الرياض وجدة.",
    desc_en: "Premium Polyethylene and high-density PVC shades, heat and UV resistant across Riyadh and Jeddah.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=1200&q=80",
    specs: ["مقاومة للحرارة 95%", "ضمان 10 سنوات", "متعدد الألوان"]
  },
  {
    id: 2,
    title_ar: "سواتر ليزر وخشبية",
    title_en: "Laser-cut & Wooden Screens",
    desc_ar: "حلول منزلية تضمن الخصوصية التامة مع تصاميم قص ليزر عصرية وسواتر خشبية معالجة تضفي جمالاً على منزلك.",
    desc_en: "Privacy solutions with modern laser-cut designs and treated wood that adds elegance to your home.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1615873968403-89e068628265?auto=format&fit=crop&w=1200&q=80",
    specs: ["حديد قص ليزر 4 ملم", "خشب بلاستيكي معالج", "دهانات نارية"]
  },
  {
    id: 3,
    title_ar: "برجولات وحدائق",
    title_en: "Pergolas & Gardens",
    desc_ar: "تصميم وتنفيذ برجولات خشبية وحديدية بلمسات ديكورية ساحرة تجعل جلستك الخارجية واحة من الاسترخاء.",
    desc_en: "Custom wood and steel pergolas with decorative touches that turn your outdoors into an oasis.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1200&q=80",
    specs: ["إنارة LED مدمجة", "أرضيات عشب صناعي", "تغطية لكسان شفافة"]
  },
  {
    id: 4,
    title_ar: "قرميد ملكي",
    title_en: "Royal Tiles (Qarmid)",
    desc_ar: "تغطية أسطح وملاحق بأجود أنواع القرميد الوطني والايطالي، عزل مائي وحراري كامل بألوان متعددة.",
    desc_en: "Roofing with premium national and Italian tiles, full water and heat insulation in various colors.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1200&q=80",
    specs: ["عزل مائي 5 طبقات", "خشب سويدي أصلي", "ألوان فخارة طبيعية"]
  },
  {
    id: 5,
    title_ar: "خيام ملكية",
    title_en: "Royal Tents",
    desc_ar: "تصميم بيوت الشعر والخيام التقليدية بروح عصرية وفخامة ملكية تناسب المجالس الكبيرة والمخيمات الفاخرة.",
    desc_en: "Traditional tents and Majlis designed with a modern soul and royal luxury for large gatherings.",
    icon: Tent,
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=1200&q=80",
    specs: ["أقمشة سدو فاخرة", "تكييف مخفي", "ديكورات جبسية تراثية"]
  },
  {
    id: 6,
    title_ar: "هناجر ومستودعات",
    title_en: "Warehouses & Hangars",
    desc_ar: "بناء مستودعات وهناجر صناعية متينة وفق أعلى المعايير الهندسية لضمان المساحة والأمان لمشروعك.",
    desc_en: "Sturdy industrial hangars and warehouses built to highest engineering standards for your project safety.",
    icon: Warehouse,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    specs: ["جسور حديد سابك", "ألواح ساندوتش بانل", "أنظمة إطفاء حريق"]
  }
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  lang: Language;
  onOpen: (service: any) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, lang, onOpen }) => {
  const isAr = lang === 'ar';
  const t = translations[lang];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="perspective-card group relative h-[500px] w-full cursor-pointer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => onOpen(service)}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="tilt-inner relative w-full h-full bg-dark-800 rounded-[32px] overflow-hidden border border-gold-500/20 group-hover:border-gold-500 transition-colors duration-500 shadow-2xl"
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 group-hover:opacity-0 transition-opacity duration-500 text-center">
          <div className="w-20 h-20 rounded-2xl bg-dark-900 border border-gold-500/30 flex items-center justify-center mb-6 mx-auto">
            <service.icon className="w-10 h-10 text-gold-500" />
          </div>
          <h3 className="text-2xl font-cairo font-black text-gold-500 leading-tight">
            {isAr ? service.title_ar : service.title_en}
          </h3>
        </div>

        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100"
          style={{ backgroundImage: `url(${service.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
           <h3 className="text-xl font-cairo font-black text-white mb-2">
             {isAr ? service.title_ar : service.title_en}
           </h3>
           <p className="text-gray-300 text-sm mb-6 line-clamp-3">
             {isAr ? service.desc_ar : service.desc_en}
           </p>
           <button className="flex items-center gap-3 text-gold-500 font-black text-xs uppercase tracking-widest">
             {t.viewDetails}
             {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleConsultationScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-32 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-28">
          <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-xs block mb-4">
            {isAr ? 'الخدمات المتكاملة' : 'INTEGRATED SERVICES'}
          </span>
          <h2 className="text-4xl md:text-6xl font-cairo font-black text-white mb-8">
            {isAr ? 'قائمة حلول' : 'SOLUTIONS'} <span className="text-gold-500">{isAr ? 'تاج الظل' : 'BY TAJ AL-ZILL'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              lang={lang} 
              onOpen={setSelectedService} 
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 text-center p-12 md:p-24 rounded-[60px] bg-dark-800 border border-gold-500/10 max-w-5xl mx-auto relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gold-500/5 blur-[120px] -z-1" />
          <h3 className="text-3xl md:text-5xl font-cairo font-black text-white mb-8">
            {isAr ? 'هل تحتاج إلى استشارة فنية مخصصة؟' : 'Need Custom Engineering Advice?'}
          </h3>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            {isAr ? 'فريقنا متاح لمساعدتك في اختيار أنسب التصاميم والخامات لمساحتك بأعلى جودة وأقل تكلفة. نحن نحرص على تقديم حلول هندسية مبتكرة تضمن لك الديمومة والجمال.' : 'Our team is here to help you choose the best designs and materials for your space at the highest quality. We ensure providing innovative engineering solutions that guarantee durability and beauty.'}
          </p>
          <a 
            href="#contact" 
            onClick={handleConsultationScroll}
            className="inline-flex items-center gap-4 bg-gold-500 hover:bg-white text-dark-900 px-14 py-6 rounded-full font-black text-xl transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            {t.engineeringCta}
            {isAr ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
          </a>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-dark-800 rounded-[40px] overflow-hidden border border-gold-500/30 shadow-[0_0_100px_rgba(212,175,55,0.2)] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedService.image} className="w-full h-full object-cover" alt={selectedService.title_ar} />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 left-6 p-2 rounded-full bg-dark-900/50 text-gold-500 hover:bg-gold-500 hover:text-dark-900 transition-all z-20"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 mb-6 text-gold-500">
                  <selectedService.icon className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">{t.specsTitle}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-cairo font-black text-white mb-6">
                  {isAr ? selectedService.title_ar : selectedService.title_en}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {isAr ? selectedService.desc_ar : selectedService.desc_en}
                </p>
                <div className="space-y-4 mb-10">
                  {selectedService.specs.map((spec: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 text-white font-bold">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/966503058109" 
                    target="_blank"
                    className="bg-gold-500 text-dark-950 px-8 py-4 rounded-full font-black hover:bg-white transition-all shadow-lg text-center flex-grow md:flex-grow-0"
                  >
                    {t.navInquiry}
                  </a>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:border-gold-500 transition-all flex-grow md:flex-grow-0"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
