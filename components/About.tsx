
import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Award, ThumbsUp, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '../lib/translations';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { 
      title: lang === 'ar' ? 'جودة لا تضاهى' : 'Unmatched Quality', 
      desc: lang === 'ar' ? 'خامات ألمانية وكورية معتمدة' : 'Certified German & Korean materials',
      icon: ShieldCheck,
      stat: '+1200'
    },
    { 
      title: lang === 'ar' ? 'خبرة عريقة' : 'Long Experience', 
      desc: lang === 'ar' ? 'أكثر من 15 عاماً من التميز' : 'Over 15 years of excellence',
      icon: Award,
      stat: '15+'
    },
    { 
      title: lang === 'ar' ? 'ثقة العملاء' : 'Client Trust', 
      desc: lang === 'ar' ? 'ضمان حقيقي يصل لـ 10 سنوات' : 'Real 10-year comprehensive warranty',
      icon: ThumbsUp,
      stat: '100%'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Side */}
          <div className="lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
               <span className="h-[2px] w-12 bg-gold-500"></span>
               <span className="text-gold-500 font-black uppercase tracking-[0.3em] text-xs">{t.aboutBadge}</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-cairo font-black text-white mb-8 leading-tight">
              {t.aboutTitle}
            </h2>
            
            <p className="text-gray-300 leading-relaxed mb-6 text-xl font-light">
              {t.aboutDesc1}
            </p>
            
            <p className="text-gray-400 leading-relaxed mb-10 text-lg border-r-4 border-gold-500/30 pr-6 italic">
              {t.aboutDesc2}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="group bg-dark-900/50 p-6 rounded-2xl border border-gold-900/20 hover:border-gold-500 transition-all duration-500 backdrop-blur-sm">
                <div className="text-4xl font-black text-gold-500 mb-2 group-hover:scale-110 transition-transform inline-block">+1200</div>
                <div className="text-sm font-bold text-gray-200 uppercase tracking-wider">{t.aboutStat1}</div>
              </div>
              <div className="group bg-dark-900/50 p-6 rounded-2xl border border-gold-900/20 hover:border-gold-500 transition-all duration-500 backdrop-blur-sm">
                <div className="text-4xl font-black text-gold-500 mb-2 group-hover:scale-110 transition-transform inline-block">15</div>
                <div className="text-sm font-bold text-gray-200 uppercase tracking-wider">{t.aboutStat2}</div>
              </div>
            </div>
          </div>

          {/* Media Side (Video + Separated Testimonial) */}
          <div className="flex flex-col gap-8">
            {/* Video Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden border-2 border-gold-500/20 shadow-2xl aspect-[16/10] group"
            >
              {/* Cinematic Background Video */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
              >
                <source src="https://player.vimeo.com/external/454502015.hd.mp4?s=34a58b9f71c4801115810b42f1f50125c5a08990&profile_id=175" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent"></div>
              
              {/* Dynamic Content Overlay - Now has full space */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-gold-500/10 backdrop-blur-2xl border border-gold-500/40 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                      {React.createElement(slides[activeSlide].icon, { className: "w-12 h-12 text-gold-500" })}
                    </div>
                    <div className="text-6xl font-black text-white mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{slides[activeSlide].stat}</div>
                    <h4 className="text-3xl font-black text-gold-500 mb-4 tracking-tight">{slides[activeSlide].title}</h4>
                    <p className="text-white/90 text-xl max-w-sm font-medium">{slides[activeSlide].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimal Progress Indicators inside video */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-700 ${activeSlide === i ? 'w-10 bg-gold-500 shadow-[0_0_10px_#D4AF37]' : 'w-3 bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Testimonial - Now Separated for zero overlap */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900/40 backdrop-blur-md border border-gold-500/10 p-8 rounded-[32px] relative overflow-hidden group hover:border-gold-500/30 transition-all duration-500"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gold-500/5 group-hover:rotate-12 transition-transform duration-700" />
              
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-gold-500 font-black text-xl">
                      {lang === 'ar' ? 'ع' : 'C'}
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-right">
                  <div className="flex justify-center md:justify-start gap-1 text-gold-500 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-200 text-lg italic leading-relaxed font-medium mb-3">
                    "{t.aboutTestimonial}"
                  </p>
                  <div className="text-xs text-gold-500 font-black uppercase tracking-[0.2em]">
                    — {lang === 'ar' ? 'عميل موثق من مدينة الرياض' : 'Verified Client from Riyadh'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
