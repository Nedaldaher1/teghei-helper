// ✨ مسار الملف: src/pages/index.tsx
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // إخفاء الشاشة التوضيحية
  const hideIntroOverlay = () => {
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
      introOverlay.style.opacity = '0';
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 500);
    }
  };

  // التمرير إلى الأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // التحكم في زر العودة للأعلى
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    // التمرير السلس بين الأقسام
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const targetId = target.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - (isMobile ? 60 : 80),
            behavior: 'smooth'
          });
        }
      });
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="relative">
      {/* الشاشة التوضيحية الأولى */}


      {/* القسم الأول: مقدمة مع فيديو خلفي */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/90 to-sky-700/80 z-10"></div>
        
        <div className="relative z-20 p-4 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-shadow-lg">
              <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                مرحباً بكم في منصة ملخصاتي
              </span>
            </h1>
            
            {/* النص المضاف */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8 w-full max-w-3xl mx-auto"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-sky-100 leading-relaxed">
                منصة تعليمية تقدم ملخصات دراسية شاملة ودروسًا مبسطة لجميع المراحل التعليمية، 
                تم تصميمها لمساعدة الطلاب على فهم المواد الدراسية بشكل أعمق وتحقيق التفوق الأكاديمي
              </p>
            </motion.div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-sky-100 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
              بوابة تعليمية تم تطويرها بشغف لنشر المعرفة وتبسيط المواد الدراسية للطلاب في جميع المراحل
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4"
            >
              <motion.a 
                href="/subjects" 
                className="px-6 py-2 md:px-8 md:py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ابدأ التصفح
              </motion.a>
              <motion.a 
                href="#about" 
                className="px-6 py-2 md:px-8 md:py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تعرف عليّ
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* موجات زخرفية في الأسفل */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full z-20"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg viewBox="0 0 1440 120" className="fill-current text-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </motion.div>
      </section>

      {/* القسم الثاني: من أنا؟ */}
      <motion.section 
        id="about" 
        className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-sky-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-5xl mx-auto bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 bg-sky-900 p-6 md:p-8 flex flex-col items-center justify-center">
                <motion.div 
                  className="relative mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-sky-500 rounded-full opacity-30 animate-pulse"></div>
                  <img 
                    className="relative h-40 w-40 md:h-48 md:w-48 rounded-full object-cover shadow-xl border-4 border-white z-10" 
                    src="/myimage.png" 
                    alt="عبد الرحمن صيفي" 
                  />
                </motion.div>
                
                {/* منصات التواصل الاجتماعي */}
                <motion.div 
                  className="flex space-x-3 md:space-x-4 mt-3 md:mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <a href="https://twitter.com" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-700 hover:bg-sky-600 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-700 hover:bg-sky-600 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-700 hover:bg-sky-600 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </motion.div>
              </div>
              <div className="w-full md:w-2/3 p-6 md:p-8 lg:p-12">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-sky-800 mb-3 md:mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  مرحباً، أنا عبد الرحمن صيفي
                </motion.h2>
                
                <motion.div 
                  className="prose prose-sm md:prose-lg text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p>
                    طالب في <span className="font-bold text-sky-600">مدرسة المهلب</span>، أبلغ من العمر 17 عاماً، وأهوى البرمجة والتقنية. قمت بتطوير هذه المنصة التعليمية لمساعدة الطلاب في فهم المواد الدراسية بشكل أسهل وأكثر متعة.
                  </p>
                  <p className="mt-3 md:mt-4">
                    أرى في البرمجة أداة قوية لخلق حلول تساعد الآخرين وتترك أثراً إيجابياً في المجتمع. هدفي هو نشر المعرفة وتمكين الطلاب من تحقيق إمكاناتهم الكاملة.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-6 flex flex-wrap gap-2 md:gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="px-3 py-1 text-xs md:text-sm bg-sky-100 text-sky-700 rounded-full font-medium">مطور ويب</span>
                  <span className="px-3 py-1 text-xs md:text-sm bg-sky-100 text-sky-700 rounded-full font-medium">طالب علم</span>
                  <span className="px-3 py-1 text-xs md:text-sm bg-sky-100 text-sky-700 rounded-full font-medium">مهتم بالذكاء الاصطناعي</span>
                  <span className="px-3 py-1 text-xs md:text-sm bg-sky-100 text-sky-700 rounded-full font-medium">ناشط تعليمي</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* القسم الثالث: رؤيتي وأهدافي */}
      <motion.section 
        className="py-12 md:py-16 lg:py-24 bg-sky-900 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.header 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">رؤيتي وأهدافي</h2>
            <div className="w-16 md:w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
            <p className="text-base md:text-lg text-sky-200 mt-4 md:mt-6 max-w-2xl mx-auto">
              أسعى من خلال هذا المشروع وغيره لتحقيق أهداف تعليمية وتقنية تساهم في تطوير المجتمع
            </p>
          </motion.header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              className="card bg-sky-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-sky-700 hover:border-sky-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-sky-700 text-sky-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">نشر الوعي التقني</h3>
              <p className="text-sm md:text-base text-sky-200">
                تبسيط المفاهيم التقنية وجعلها في متناول الجميع، وتشجيع الشباب على دخول هذا المجال الواعد من خلال توفير مصادر تعليمية مجانية.
              </p>
            </motion.div>

            <motion.div 
              className="card bg-sky-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-sky-700 hover:border-sky-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-sky-700 text-sky-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">مساعدة أكبر فئة</h3>
              <p className="text-sm md:text-base text-sky-200">
                توفير أدوات ومصادر تعليمية مجانية تساعد الطلاب في مختلف المراحل الدراسية على التفوق وتحقيق أحلامهم الأكاديمية.
              </p>
            </motion.div>

            <motion.div 
              className="card bg-sky-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-sky-700 hover:border-sky-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 bg-sky-700 text-sky-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-.707-.707M19.071 19.071l-.707-.707M5.636 18.364l-.707.707M19.071 4.929l-.707.707M12 12a5 5 0 11-10 0 5 5 0 0110 0z" /></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">دراسة الذكاء الاصطناعي</h3>
              <p className="text-sm md:text-base text-sky-200">
                حلمي الأكاديمي هو التخصص في مجال الذكاء الاصطناعي والمساهمة في بناء مستقبل التكنولوجيا وتطوير حلول ذكية لمشاكل العالم الحقيقي.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* القسم الرابع: مشاريعي وإنجازاتي */}
      <motion.section 
        className="py-12 md:py-16 lg:py-24 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.header 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-800 mb-3 md:mb-4">مشاريعي وإنجازاتي</h2>
            <div className="w-16 md:w-24 h-1 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 max-w-2xl mx-auto">
              بعض المشاريع التي عملت عليها والتي تعكس شغفي بالبرمجة والتعليم
            </p>
          </motion.header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              className="bg-sky-50 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="h-40 sm:h-48 bg-gradient-to-r from-sky-400 to-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-sky-800 mb-2">منصة ملخصاتي</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  منصة تعليمية توفر ملخصات ومواد دراسية مبسطة للطلاب في مختلف المراحل التعليمية.
                </p>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full">مشروع تعليمي</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-sky-50 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="h-40 sm:h-48 bg-gradient-to-r from-sky-400 to-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-sky-800 mb-2">مدونة التقنية المبسطة</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  مدونة تقدم شروحات مبسطة للمفاهيم التقنية والبرمجية للمبتدئين في هذا المجال.
                </p>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full">تعليم تقني</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-sky-50 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="h-40 sm:h-48 bg-gradient-to-r from-sky-400 to-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-sky-800 mb-2">تطبيق الأمان الرقمي</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  تطبيق يساعد المستخدمين على حماية بياناتهم الرقمية وتعلم ممارسات الأمان السيبراني.
                </p>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full">تطبيق جوال</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* القسم الخامس: دعوة للتواصل */}
      <motion.section 
        className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-sky-800 to-sky-600 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              هل لديك استفسار أو اقتراح؟
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-sky-100 mb-8 md:mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              أنا دائماً متحمس للتعاون والتواصل مع الطلاب والمهتمين بالتقنية والتعليم
            </motion.p>
            
            {/* روابط التواصل الاجتماعي */}
            <motion.div 
              className="flex justify-center space-x-4 md:space-x-5 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href="https://twitter.com" target="_blank" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="mailto:contact@mulakhasati.com" 
                className="px-6 py-2 md:px-8 md:py-3 bg-white text-sky-700 font-bold rounded-lg shadow-lg hover:bg-sky-100 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تواصل عبر البريد
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                className="px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تابعني على تويتر
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* زر الطائف الدائري */}
      <motion.button 
        id="scroll-to-top" 
        className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 left-6'} w-12 h-12 md:w-14 md:h-14 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg flex items-center justify-center z-40 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="العودة إلى الأعلى"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
}