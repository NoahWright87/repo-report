import './SlideNavigation.css';

interface ClickGuttersProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideNavigation({ currentIndex, totalSlides, onPrev, onNext }: ClickGuttersProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <>
      <div
        className={`rr-gutter rr-gutter--left${isFirst ? ' rr-gutter--boundary' : ''}`}
        onClick={!isFirst ? onPrev : undefined}
        role={!isFirst ? 'button' : undefined}
        aria-label={!isFirst ? 'Previous slide' : undefined}
        tabIndex={!isFirst ? 0 : undefined}
        onKeyDown={!isFirst ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPrev(); } } : undefined}
      >
        <span className="rr-gutter__arrow" aria-hidden="true">‹</span>
      </div>
      <div
        className={`rr-gutter rr-gutter--right${isLast ? ' rr-gutter--boundary' : ''}`}
        onClick={!isLast ? onNext : undefined}
        role={!isLast ? 'button' : undefined}
        aria-label={!isLast ? 'Next slide' : undefined}
        tabIndex={!isLast ? 0 : undefined}
        onKeyDown={!isLast ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNext(); } } : undefined}
      >
        <span className="rr-gutter__arrow" aria-hidden="true">›</span>
      </div>
    </>
  );
}
