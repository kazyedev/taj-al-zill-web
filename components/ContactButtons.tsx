
import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ContactButtonsProps {
  lang: Language;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[9999]">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/966503058109"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-green"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-dark-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gold-900">
            {t.whatsappTooltip}: 0503058109
        </span>
      </a>

      {/* Call Button */}
      <a
        href="tel:+966503058109"
        className="group relative flex items-center justify-center w-14 h-14 bg-gold-500 text-dark-900 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-gold"
      >
        <Phone className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-dark-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gold-900">
            {t.callTooltip}: 0503058109
        </span>
      </a>
    </div>
  );
};

export default ContactButtons;
