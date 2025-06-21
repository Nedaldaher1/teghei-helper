// src/components/AnimateOnScroll.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// تحديد أنواع الخصائص (Props) التي سيستقبلها المكون
interface Props {
  children: ReactNode; // المحتوى الذي سيتم تحريكه
  className?: string; // لإضافة أي كلاسات CSS إضافية
  delay?: number; // لتأخير الأنيميشن إذا أردت
  y?: number; // مقدار الحركة على محور Y
}

export default function AnimateOnScroll({ children, className, delay = 0, y = 50 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y }} // يبدأ شفافاً ومتحركاً للأسفل
      whileInView={{ opacity: 1, y: 0 }} // يصبح ظاهراً وفي مكانه عند رؤيته
      viewport={{ once: true, amount: 0.3 }} // يعمل الأنيميشن مرة واحدة عند ظهور 30% من العنصر
      transition={{
        duration: 0.8,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}