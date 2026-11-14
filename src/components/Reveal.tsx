import React, { useEffect, useRef, useState } from 'react';

export type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect user reduced-motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getHiddenTransform = () => {
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-7 sm:-translate-x-10';
      case 'right':
        return 'opacity-0 translate-x-7 sm:translate-x-10';
      case 'scale':
        return 'opacity-0 scale-[0.95]';
      case 'fade':
        return 'opacity-0';
      case 'up':
      default:
        return 'opacity-0 translate-y-6 sm:translate-y-8';
    }
  };

  const getVisibleTransform = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return 'opacity-100 translate-x-0';
      case 'scale':
        return 'opacity-100 scale-100';
      case 'fade':
        return 'opacity-100';
      case 'up':
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`transition-all will-change-transform ${
        isVisible ? getVisibleTransform() : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
};
