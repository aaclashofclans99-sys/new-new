import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  depth?: number;
  className?: string;
  threshold?: number;
  resetOnExit?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  depth = 0,
  className = '',
  threshold = 0.1,
  resetOnExit = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  /* ============================
     OLD SYSTEM (IntersectionObserver + CSS)
     ============================ */
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('reveal-visible');
            }, delay);
          } else if (resetOnExit) {
            element.classList.remove('reveal-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, resetOnExit]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'reveal-up';
      case 'down':
        return 'reveal-down';
      case 'left':
        return 'reveal-left';
      case 'right':
        return 'reveal-right';
      case 'fade':
        return 'reveal-fade';
      case 'zoom':
        return 'reveal-zoom';
      default:
        return 'reveal-up';
    }
  };

  const getDepthClass = () => {
    if (depth === 1) return 'reveal-depth-light';
    if (depth === 2) return 'reveal-depth-medium';
    if (depth === 3) return 'reveal-depth-heavy';
    return '';
  };

  /* ============================
     NEW SYSTEM (Framer Motion)
     ============================ */
  const isInView = useInView(ref, { once: !resetOnExit, margin: '-100px' });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'zoom' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (resetOnExit) {
      controls.start('hidden');
    }
  }, [isInView, controls, resetOnExit]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`reveal ${getDirectionClass()} ${getDepthClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
