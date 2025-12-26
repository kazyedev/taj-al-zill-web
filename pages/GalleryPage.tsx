
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Filter } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface GalleryPageProps {
  lang: Language;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState('all');
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const categories = [
    { id: 'all', name: t.galleryFilterAll },
    { id: 'cars', name: lang === 'ar' ? 'مظلات سيارات' : 'Car Shades' },
    { id: 'pergola', name: lang === 'ar' ? 'برجولات' : 'Pergolas' },
    { id: 'screens', name: lang === 'ar' ? 'سواتر' : 'Screens' },
    { id: 'tiles', name: lang === 'ar' ? 'قرميد' : 'Tiles' },
    { id: 'tents', name: lang === 'ar' ? 'بيوت شعر' : 'Tents' },
  ];

  const allImages = Array.from({ length: 50 }, (_, i) => {
    const cat = categories[1 + (i % (categories.length - 1))];
    return {
      id: i,
      url: `https://picsum.photos/seed/${i + 50}/800/600`,
      title: lang === 'ar' ? `${cat.name} - مشروع ${i + 1}` : `${cat.name} - Project ${i + 1}`,
      category: cat.id,
      categoryName: cat.name
    };
  });

  const filteredImages = activeCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    // @ts-ignore
    if (window.Swiper) {
      if (swiperInstance) swiperInstance.destroy();
      
      // @ts-ignore
      const newSwiper = new window.Swiper('.gallery-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: filteredImages.length > 3,
        coverflowEffect: {
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
        },
        pagination: {
          el: '.swiper-pagination-gallery',
          clickable: true,
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
      });
      setSwiperInstance(newSwiper);
    }
  }, [activeCategory, lang]);

  return (
    <div className="pt-32 pb-24 bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.galleryTitle}</h1>
          <p className="text-gold-500 font-medium tracking-widest uppercase">{t.gallerySub}</p>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                activeCategory === cat.id 
                ? 'bg-gold-500 border-gold-500 text-dark-900 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                : 'bg-dark-800 border-white/10 text-gray-400 hover:border-gold-500/50 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative mb-24">
          <div className="swiper gallery-swiper w-full pt-10 pb-20">
            <div className="swiper-wrapper">
              {filteredImages.map((img) => (
                <div key={img.id} className="swiper-slide w-[300px] md:w-[600px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent p-8 flex flex-col justify-end">
                      <span className="text-gold-500 font-bold mb-2 uppercase tracking-tighter">{img.categoryName}</span>
                      <h3 className="text-white text-2xl font-bold">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 mt-10">
                <button className="swiper-btn-prev w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-dark-900 transition-all">
                    {lang === 'ar' ? <ChevronRight /> : <ChevronLeft />}
                </button>
                <div className="swiper-pagination-gallery !static !w-auto flex items-center px-4"></div>
                <button className="swiper-btn-next w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-dark-900 transition-all">
                    {lang === 'ar' ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
           <div className="flex items-center gap-4 mb-12">
              <Filter className="text-gold-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">{t.galleryBrowseAll}</h2>
           </div>
           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.slice(0, 15).map((img) => (
                <div key={img.id} className="break-inside-avoid relative rounded-xl overflow-hidden group border border-white/5">
                   <img src={img.url} alt={img.title} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all" />
                   <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-4">
                      <p className="text-gold-500 font-bold">{img.title}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="text-center mt-12">
              <button className="bg-transparent border border-gold-500 text-gold-500 px-10 py-3 rounded-full hover:bg-gold-500 hover:text-dark-900 transition-all font-bold">
                {t.galleryLoadMore}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
