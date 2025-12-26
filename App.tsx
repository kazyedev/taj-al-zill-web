
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import VideoShowcase from './components/VideoShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactButtons from './components/ContactButtons';
import GalleryPage from './pages/GalleryPage';
import Preloader from './components/Preloader';
import { Language } from './lib/translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery') {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync HTML attributes for RTL/LTR and Theme
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [lang, theme]);

  const navigateTo = (page: 'home' | 'gallery') => {
    window.location.hash = page === 'gallery' ? 'gallery' : 'home';
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-dark-950 text-gray-100' : 'bg-white text-gray-900'} selection:bg-gold-500 selection:text-dark-900`}>
      <Preloader />
      
      <Navbar 
        onNavigate={navigateTo} 
        currentPage={currentPage} 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        setTheme={setTheme} 
      />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <div className="animate-fade-in">
            <Hero lang={lang} />
            <About lang={lang} />
            <Stats lang={lang} />
            <Services lang={lang} />
            <VideoShowcase onNavigate={navigateTo} lang={lang} />
            <Contact lang={lang} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <GalleryPage lang={lang} />
          </div>
        )}
      </main>

      <Footer lang={lang} onNavigate={navigateTo} currentPage={currentPage} />
      <ContactButtons lang={lang} />
    </div>
  );
};

export default App;
