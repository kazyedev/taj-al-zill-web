
import React, { useState, useEffect } from 'react';
import { Shield, Globe, Moon, Sun, Phone } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface NavbarProps {
  onNavigate: (page: 'home' | 'gallery') => void;
  currentPage: string;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, lang, setLang, theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, href: 'home', type: 'page' },
    { name: t.navAbout, href: 'about', type: 'scroll' },
    { name: t.navServices, href: 'services', type: 'scroll' },
    { name: t.navGallery, href: 'gallery', type: 'page' },
    { name: t.navContact, href: 'contact', type: 'scroll' },
  ];

  const handleClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    if (link.type === 'page') {
      onNavigate(link.href);
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(link.href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const element = document.getElementById(link.href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'bg-dark-900/98 backdrop-blur-md py-3 shadow-2xl border-b border-gold-500/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Right Section: Logo + Links */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group shrink-0" onClick={() => onNavigate('home')}>
              <div className="bg-gold-500 p-1.5 md:p-2 rounded-lg shadow-lg group-hover:rotate-6 transition-transform">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-dark-950" />
              </div>
              <span className="text-xl md:text-2xl lg:text-3xl font-cairo font-black text-white leading-none">
                {t.brand}
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 border-r border-white/10 pr-6 lg:pr-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.href}`} 
                  onClick={(e) => handleClick(e, link)} 
                  className={`text-sm lg:text-[15px] font-bold transition-all duration-300 hover:text-gold-500 whitespace-nowrap ${currentPage === link.href ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-200'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Left Section: Actions */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-400 hover:text-gold-500 hover:bg-white/5 rounded-full transition-all"
              title="الوضع الليلي/النهاري"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black text-gray-200 hover:border-gold-500/50 hover:text-gold-500 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            <a 
              href="tel:+966503058109"
              className="flex items-center gap-2 bg-gold-500 hover:bg-white text-dark-950 px-4 lg:px-6 py-2 md:py-2.5 rounded-full font-black text-[12px] md:text-sm transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 md:w-4 h-4" />
              <span className="hidden lg:inline">{t.navInquiry}</span>
              <span className="lg:hidden">{t.navContact}</span>
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
