
import React, { useEffect, useState } from 'react';
import { Heart, Trophy, MapPin, Users } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface StatsProps {
  lang: Language;
}

const Stats: React.FC<StatsProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-dark-900 border-y border-gold-900/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
             <path 
               d="M0,100 Q150,150 300,100 T600,100 T900,100 T1200,100" 
               fill="none" 
               stroke="#D4AF37" 
               strokeWidth="2"
               className="animate-[pulse_3s_ease-in-out_infinite]"
             />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-white mb-4">{t.statsTitle}</h2>
           <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-dark-800 rounded-full flex items-center justify-center border border-gold-500/30 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Trophy className="w-8 h-8 text-gold-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2 font-mono">+1200</div>
            <div className="text-gray-400 text-sm">{t.statWeddings}</div>
          </div>

          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-dark-800 rounded-full flex items-center justify-center border border-gold-500/30 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <MapPin className="w-8 h-8 text-gold-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2 font-mono">+15</div>
            <div className="text-gray-400 text-sm">{t.statHalls}</div>
          </div>

          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-dark-800 rounded-full flex items-center justify-center border border-gold-500/30 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Users className="w-8 h-8 text-gold-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2 font-mono">+5K</div>
            <div className="text-gray-400 text-sm">{t.statGuests}</div>
          </div>

          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-dark-800 rounded-full flex items-center justify-center border border-gold-500/30 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)] relative">
              <span className="absolute inset-0 rounded-full bg-gold-500 opacity-20 animate-ping"></span>
              <Heart className="w-8 h-8 text-gold-500 animate-pulse" />
            </div>
            <div className="text-4xl font-bold text-white mb-2 font-mono">100%</div>
            <div className="text-gray-400 text-sm">{t.statPassion}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
