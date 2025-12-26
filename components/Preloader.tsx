
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1)_0%,_transparent_70%)]" />
          
          <div className="relative z-10 text-center select-none" dir="rtl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center gap-4 text-7xl md:text-9xl font-cairo font-black"
            >
              <span className="text-white">تاج</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700">الظل</span>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "260px" }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-12 relative overflow-hidden"
            >
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-gold-400 blur-[2px]"
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-gold-500/60 font-medium tracking-[0.4em] uppercase text-xs font-cairo"
            >
              جاري تحميل الفخامة
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
