import { useState, useRef, useEffect } from 'react';
import { Header, ToggleIcon, toggleThemeMode, getThemeMode } from '@noahwright/design';
import type { ReportMeta, Slide } from '../types/report';
import { SlidePicker } from './SlideViewer/SlidePicker';
import './ReportHeader.css';

/** Derive the home URL by stripping /reports/... from the current path */
function getHomeUrl() {
  const path = window.location.pathname;
  const idx = path.indexOf('/reports/');
  return idx >= 0 ? path.slice(0, idx) + '/' : '/';
}

interface ReportHeaderProps {
  meta: ReportMeta;
  slides?: Slide[];
  currentIndex?: number;
  onGoTo?: (index: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ReportHeader({ meta, slides, currentIndex = 0, onGoTo, onPrev, onNext }: ReportHeaderProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const hasNav = !!(slides && onGoTo && onPrev && onNext);
  const canGoPrev = hasNav && currentIndex > 0;
  const canGoNext = hasNav && currentIndex < (slides?.length ?? 1) - 1;
  const reportTitle = meta.title;

  // Close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [pickerOpen]);

  return (
    <Header
      left={
        <a href={getHomeUrl()} className="rr-header-home-link" aria-label="All reports">
          ← All Reports
        </a>
      }
      center={
        hasNav ? (
          <div ref={navRef} className="rr-report-nav">
            <button
              className="rr-report-nav__arrow-btn"
              disabled={!canGoPrev}
              onClick={onPrev}
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              className="rr-report-nav__title-btn"
              onClick={() => setPickerOpen(p => !p)}
              aria-expanded={pickerOpen}
              aria-haspopup="listbox"
            >
              <span className="rr-report-nav__title-text">{reportTitle}</span>
              <span className="rr-report-nav__caret" aria-hidden="true">{pickerOpen ? '▴' : '▾'}</span>
            </button>
            <button
              className="rr-report-nav__arrow-btn"
              disabled={!canGoNext}
              onClick={onNext}
              aria-label="Next slide"
            >
              →
            </button>
            {pickerOpen && slides && (
              <SlidePicker
                slides={slides}
                currentIndex={currentIndex}
                onGoTo={(i) => { onGoTo!(i); setPickerOpen(false); }}
                onClose={() => setPickerOpen(false)}
              />
            )}
          </div>
        ) : null
      }
      right={
        <ToggleIcon
          preset="moon-sun"
          defaultToggled={getThemeMode() === 'dark'}
          onChange={() => toggleThemeMode()}
          label="Toggle dark mode"
          size="md"
        />
      }
    />
  );
}
