
import React, { useState } from 'react';
import { Phone, MapPin, Instagram, Send, MessageCircle } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: lang === 'ar' ? 'مظلات سيارات' : 'Car Shades',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `مرحباً تاج الظل، أرغب في طلب تسعيرة لـ ${formData.type}.%0A%0Aالاسم: ${formData.name}%0Aالجوال: ${formData.phone}%0Aالتفاصيل: ${formData.message}`;
    const whatsappUrl = `https://wa.me/966503058109?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t.contactTitle} <br/> <span className="text-gold-500">{t.contactSubTitle}</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              {t.contactDesc}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-dark-800 p-3 rounded-lg border border-gold-900">
                  <Phone className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{t.contactInfoTitle}</h4>
                  <a href="tel:+966503058109" className="text-gray-400 hover:text-gold-500 transition-colors block">
                    +966 50 305 8109
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-dark-800 p-3 rounded-lg border border-gold-900">
                  <MapPin className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{t.contactLocationTitle}</h4>
                  <p className="text-gray-400">{t.contactLocationDesc}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
               <a href="#" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-dark-900 transition-colors border border-white/10">
                 <Instagram className="w-6 h-6" />
               </a>
               <a href="#" className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-500 hover:text-dark-900 transition-colors border border-white/10">
                 <Send className="w-5 h-5 -ml-1" />
               </a>
            </div>
          </div>

          <div className="bg-dark-800 p-8 rounded-2xl border border-gold-500/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">{t.contactFormTitle}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">{t.formName}</label>
                  <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder={t.formPlaceName}/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">{t.formPhone}</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder={t.formPlacePhone}/>
                </div>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">{t.formType}</label>
                <select id="type" value={formData.type} onChange={handleChange} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors">
                  {lang === 'ar' ? (
                    <>
                      <option>مظلات سيارات</option>
                      <option>سواتر خصوصية</option>
                      <option>برجولات حدائق</option>
                      <option>هناجر ومستودعات</option>
                      <option>قرميد ومظلات مسابح</option>
                    </>
                  ) : (
                    <>
                      <option>Car Shades</option>
                      <option>Privacy Screens</option>
                      <option>Garden Pergolas</option>
                      <option>Warehouses</option>
                      <option>Tiles & Pools</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">{t.formMessage}</label>
                <textarea id="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors" placeholder={t.formPlaceDetails}></textarea>
              </div>

              <button type="submit" className="w-full bg-gold-500 text-dark-900 font-bold py-4 rounded-lg hover:bg-gold-600 transition-colors shadow-lg mt-4 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
