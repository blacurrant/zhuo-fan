'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Simulate progress up to 90%, then wait for window load
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(intervalRef.current!);
          return 90;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 120);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      clearInterval(intervalRef.current!);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';
      }, 400);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    return () => {
      clearInterval(intervalRef.current!);
      window.removeEventListener('load', finish);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#f9f7f3] dark:bg-[#202020] z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Name */}
          <motion.p
            className="text-[#202020] dark:text-[#f9f7f3] font-display text-2xl tracking-tight mb-10 select-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            nishant.world
          </motion.p>

          {/* Progress bar track */}
          <div className="w-48 h-[2px] bg-[#202020]/10 dark:bg-[#f9f7f3]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ea2804] rounded-full origin-left"
              style={{ scaleX: progress / 100 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-xs font-mono text-[#202020]/40 dark:text-[#f9f7f3]/40 select-none tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
