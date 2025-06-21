import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // دالة للتحقق من موقع التمرير وإظهار/إخفاء الزر
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // إظهار الزر بعد تمرير 300 بكسل
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // دالة التمرير السلس إلى أعلى الصفحة
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // إضافة مستمع لحدث التمرير عند تحميل المكون
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // إزالة المستمع عند تفكيك المكون لتجنب تسرب الذاكرة
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg flex items-center justify-center z-50"
      aria-label="العودة إلى الأعلى"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      whileHover={{ scale: isVisible ? 1.1 : 0 }} // تأثير عند مرور الماوس
      whileTap={{ scale: isVisible ? 0.95 : 0 }}   // تأثير عند الضغط
      transition={{ duration: 0.2 }}
      style={{
        // خاصية مهمة لمنع الزر من حجب العناصر خلفه عندما يكون مخفياً
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}