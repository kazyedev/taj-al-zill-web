import React from 'react';
import { PortfolioItem } from '../types';

// Real Unsplash images fitting the "Luxury Riyadh Event" theme
const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&w=800&q=80", 
    title: "زفاف ملكي - الرياض", 
    category: "زفاف" 
  },
  { 
    id: 2, 
    imageUrl: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=800&q=80", 
    title: "تجهيزات الطاولة", 
    category: "ضيافة" 
  },
  { 
    id: 3, 
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", 
    title: "إضاءة القاعة", 
    category: "ديكور" 
  },
  { 
    id: 4, 
    imageUrl: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=800&q=80", 
    title: "مسرح المؤتمرات", 
    category: "فعاليات" 
  },
  { 
    id: 5, 
    imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80", 
    title: "زهور طبيعية", 
    category: "تنسيق" 
  },
  { 
    id: 6, 
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80", 
    title: "كوشة العروس", 
    category: "تصميم" 
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">معرض أعمالنا</h2>
            <p className="text-gray-400">لقطات من مناسبات قمنا بتنظيمها بفخر</p>
          </div>
          <button className="text-gold-500 border-b border-gold-500 pb-1 hover:text-gold-400 hover:border-gold-400 transition-colors">
            شاهد المزيد من الصور
          </button>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${index === 1 || index === 4 ? 'md:row-span-2' : ''}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                style={{ minHeight: '300px' }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-gold-500 text-sm font-medium mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;