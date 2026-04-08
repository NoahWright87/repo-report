import { useEffect } from 'react';
import type { Slide } from '../../types/report';
import './SlidePicker.css';

interface SlidePickerProps {
  slides: Slide[];
  currentIndex: number;
  onGoTo: (index: number) => void;
  onClose: () => void;
}

function getSlidePreview(slide: Slide): string | undefined {
  if (slide.type === 'theme') return slide.description ?? slide.progress?.items[0]?.text;
  if (slide.type === 'summary') return slide.subtitle;
  return undefined;
}

export function SlidePicker({ slides, currentIndex, onGoTo, onClose }: SlidePickerProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Scroll active item into view on open
  useEffect(() => {
    const list = document.querySelector('.rr-slide-picker');
    const active = list?.querySelector('.rr-slide-picker__item--active');
    active?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, []);

  return (
    <div className="rr-slide-picker" role="listbox" aria-label="Slide picker">
      {slides.map((slide, i) => {
        const preview = getSlidePreview(slide);
        const isActive = i === currentIndex;
        return (
          <button
            key={slide.slug}
            role="option"
            aria-selected={isActive}
            className={`rr-slide-picker__item${isActive ? ' rr-slide-picker__item--active' : ''}`}
            onClick={() => { onGoTo(i); onClose(); }}
          >
            <span className="rr-slide-picker__num">{i + 1}</span>
            <span className="rr-slide-picker__body">
              <span className="rr-slide-picker__title">{slide.title}</span>
              {preview && <span className="rr-slide-picker__desc">{preview}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
