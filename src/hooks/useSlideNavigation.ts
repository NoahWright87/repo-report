import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Slide } from '../types/report';

export function useSlideNavigation(slides: Slide[]) {
  const slugToIndex = useMemo(() => {
    const map = new Map<string, number>();
    slides.forEach((s, i) => map.set(s.slug, i));
    return map;
  }, [slides]);

  const resolveInitialIndex = () => {
    const hash = window.location.hash.replace('#', '');
    return slugToIndex.get(hash) ?? 0;
  };

  const [currentIndex, setCurrentIndex] = useState(resolveInitialIndex);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    setCurrentIndex(clamped);
    history.replaceState(null, '', `#${slides[clamped].slug}`);
    scrollToTop();
  }, [slides]);

  const goNext = useCallback(() => {
    setCurrentIndex(prev => {
      const next = Math.min(prev + 1, slides.length - 1);
      history.replaceState(null, '', `#${slides[next].slug}`);
      scrollToTop();
      return next;
    });
  }, [slides]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => {
      const next = Math.max(prev - 1, 0);
      history.replaceState(null, '', `#${slides[next].slug}`);
      scrollToTop();
      return next;
    });
  }, [slides]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Handle browser back/forward
  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '');
      const idx = slugToIndex.get(hash);
      if (idx !== undefined) setCurrentIndex(idx);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, [slugToIndex]);

  return {
    currentIndex,
    currentSlide: slides[currentIndex],
    totalSlides: slides.length,
    goTo,
    goNext,
    goPrev,
  };
}
