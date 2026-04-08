import type { Slide } from '../../types/report';
import type { OverviewItem } from '../../App';
import { SummarySlideContent } from './SummarySlideContent';
import { ThemeSlideContent } from './ThemeSlideContent';
import { QASlideContent } from './QASlideContent';

interface SlideContentProps {
  slide: Slide;
  overviewItems?: OverviewItem[];
  onGoTo?: (index: number) => void;
}

export function SlideContent({ slide, overviewItems, onGoTo }: SlideContentProps) {
  if (slide.type === 'summary') {
    return <SummarySlideContent slide={slide} overviewItems={overviewItems} onGoTo={onGoTo} />;
  }
  if (slide.type === 'qa') {
    return <QASlideContent slide={slide} />;
  }
  return <ThemeSlideContent slide={slide} />;
}
