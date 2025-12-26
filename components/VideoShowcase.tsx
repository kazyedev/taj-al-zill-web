
import React from 'react';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface VideoShowcaseProps {
  onNavigate: (page: 'home' | 'gallery') => void;
  lang: Language;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* High-End Architectural Background Loop */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="https://player.vimeo.com/external/494244243.hd.mp4?s=33013775b81a02956c38827918f0c9096735c03e&profile_id=175" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="bg-dark-900/40 backdrop-blur-xl p-12 md:p-20 rounded-[48px] text-center border border-gold-500/10 shadow-2xl overflow-hidden group">
          {/* Animated Glow */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gold-500/10 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gold-500 rounded-full mb-10 shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-pulse-gold cursor-pointer transform hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-dark-950 fill-current ml-1" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-cairo font-black text-white mb-8 leading-tight">
              {t.heroTitle} <br/> <span className="text-gold-500">{t.heroTitleGold}</span>
            </h2>
            
            <p className="text-gray-300 text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => onNavigate('gallery')}
                className="group inline-flex items-center justify-center gap-4 bg-white/5 hover:bg-gold-500 hover:text-dark-900 border border-gold-500/30 px-12 py-5 rounded-full font-black text-lg transition-all duration-300 backdrop-blur-md"
              >
                {t.navGallery}
                {isAr ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
              </button>

              <button 
                onClick={handleConsultation}
                className="group inline-flex items-center justify-center gap-4 bg-gold-500 text-dark-950 px-12 py-5 rounded-full font-black text-lg transition-all duration-300 shadow-xl hover:bg-white"
              >
                {t.engineeringCta}
                <ArrowLeft className={`w-5 h-5 ${isAr ? 'group-hover:-translate-x-2' : 'rotate-180 group-hover:translate-x-2'} transition-transform`} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-950 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
};

export default VideoShowcase;
