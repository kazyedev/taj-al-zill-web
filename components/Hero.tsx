
import React from 'react';
import { ArrowLeft, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language, translations } from '../lib/translations';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90" 
          alt="Luxury Architecture"
          className="w-full h-full object-cover opacity-40 light-mode:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />
        <div className="absolute inset-0 bg-black/40 light-mode:bg-white/10" />
      </div>

      {/* Floating Animated Arabic Text */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: isAr ? [0, 80, 0] : [0, -80, 0], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] right-[5%] text-[18vw] font-cairo font-black text-gold-500 select-none whitespace-nowrap blur-[5px]"
        >
          تاج
        </motion.div>
        <motion.div 
          animate={{ x: isAr ? [0, -80, 0] : [0, 80, 0], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[5%] text-[18vw] font-cairo font-black text-white light-mode:text-slate-200 select-none whitespace-nowrap blur-[5px]"
        >
          الظل
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-52 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Tagline Container */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold-500/20 bg-dark-900/60 backdrop-blur-xl text-gold-400 mb-14 shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse" />
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-black">{t.tagline}</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-cairo font-black text-white leading-tight mb-12">
            <motion.span className="block mb-4">
              {t.heroTitle}
            </motion.span>
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-gold-600 drop-shadow-[0_25px_60px_rgba(212,175,55,0.7)]"
            >
              {t.heroTitleGold}
            </motion.span>
          </h1>
          
          <p className="text-gray-200 text-lg md:text-2xl mb-16 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg px-4">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.a 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 30px 60px -12px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/966503058109" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gold-500 text-dark-950 px-14 py-5 rounded-full font-black text-xl transition-all shadow-xl flex items-center gap-4 hover:bg-white"
            >
              {t.ctaQuote}
              {isAr ? <ArrowLeft className="w-6 h-6 group-hover:-translate-x-3 transition-transform" /> : <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />}
            </motion.a>
            
            <motion.a 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)", scale: 1.05 }}
              href="#about"
              onClick={(e) => handleScrollTo(e, 'about')} 
              className="px-14 py-5 rounded-full font-bold text-white border border-white/30 hover:border-white transition-all backdrop-blur-md flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-dark-950 transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              {t.ctaWhy}
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent z-10" />
    </section>
  );
};

export default Hero;
