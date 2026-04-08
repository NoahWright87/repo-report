import type { Slide } from '../../types/report';
import type { OverviewItem } from '../../App';
import { SlideContent } from '../SlideContent/SlideContent';
import './SlideViewer.css';

interface SlideViewerProps {
  slide: Slide;
  direction: 'left' | 'right' | null;
  overviewItems?: OverviewItem[];
  onGoTo?: (index: number) => void;
}

export function SlideViewer({ slide, direction, overviewItems, onGoTo }: SlideViewerProps) {
  return (
    <section className="rr-slide-viewer" aria-label="Report slides">
      <div
        className={`rr-slide-viewer__content ${direction ? `rr-slide-viewer__content--enter-${direction}` : ''}`}
        key={slide.slug}
      >
        <SlideContent slide={slide} overviewItems={overviewItems} onGoTo={onGoTo} />
      </div>
    </section>
  );
}
