
import React from 'react';
import { Shield, Instagram, Send } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (page: 'home' | 'gallery') => void;
  currentPage: string;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavigate, currentPage }) => {
  const t = translations[lang];

  const handleLinkClick = (e: React.MouseEvent, target: string, type: 'page' | 'scroll') => {
    e.preventDefault();
    if (type === 'page') {
      onNavigate(target as 'home' | 'gallery');
    } else {
      // If we are not on home, go home first then scroll
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gold-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-gold-500" />
              <span className="text-2xl font-bold text-white">{t.brand}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed mb-6">
              {t.footerDesc}
            </p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-gold-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gold-500 transition-colors"><Send className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{lang === 'ar' ? 'روابط الوصول' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleLinkClick(e, 'home', 'page')}
                  className="hover:text-gold-500 transition-colors cursor-pointer"
                >
                  {t.navHome}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleLinkClick(e, 'services', 'scroll')}
                  className="hover:text-gold-500 transition-colors cursor-pointer"
                >
                  {t.navServices}
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleLinkClick(e, 'gallery', 'page')}
                  className="hover:text-gold-500 transition-colors cursor-pointer"
                >
                  {t.navGallery}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleLinkClick(e, 'contact', 'scroll')}
                  className="hover:text-gold-500 transition-colors cursor-pointer"
                >
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{lang === 'ar' ? 'خدمة العملاء' : 'Customer Support'}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 items-center text-sm">
                 <span className="text-gold-500">{lang === 'ar' ? 'الجوال:' : 'Phone:'}</span>
                 <a href="tel:+966503058109" className="hover:text-white">+966 50 305 8109</a>
              </li>
              <li className="flex gap-2 items-center text-sm">
                 <span className="text-gold-500">{lang === 'ar' ? 'العنوان:' : 'Address:'}</span>
                 <span>{t.contactLocationDesc}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t.tagline}. {t.rights}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
