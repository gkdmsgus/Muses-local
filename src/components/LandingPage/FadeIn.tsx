import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'none';
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translateClass =
    direction === 'up'
      ? 'translate-y-10'
      : direction === 'down'
        ? '-translate-y-10'
        : '';

  return (
    <div
      ref={ref}
      className={`
        transform transition-all duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateClass}`}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
