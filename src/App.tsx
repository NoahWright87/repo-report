import { useState, useEffect, useRef } from 'react';
import { Layout, Text, initThemeMode } from '@noahwright/design';
import { ReportHeader } from './components/ReportHeader';
import { ReportFooter } from './components/ReportFooter';
import { SlideViewer } from './components/SlideViewer/SlideViewer';
import { SlideNavigation } from './components/SlideViewer/SlideNavigation';
import { DetailSection } from './components/DetailSection/DetailSection';
import { HomePage } from './components/HomePage';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import type { Slide, SprintReport, ReportIndex, ThemeSlide, ContactItem } from './types/report';

declare global {
  interface Window {
    __REPORT_DATA_URL__?: string;
  }
}

type AppMode =
  | { state: 'loading' }
  | { state: 'home'; index: ReportIndex }
  | { state: 'report'; report: SprintReport }
  | { state: 'error'; message: string };

export interface OverviewItem {
  theme: ThemeSlide;
  slideIndex: number;
}

function buildSlides(report: SprintReport): Slide[] {
  const slides: Slide[] = [report.summary, ...report.themes];
  if (report.meta.showQA !== false && report.meta.contact?.length) {
    const contact: ContactItem[] = (report.meta.contact ?? []).map(item =>
      typeof item === 'string' ? { text: item } : item
    );
    slides.push({
      type: 'qa',
      slug: 'qa',
      title: 'Questions?',
      contact,
      detailBlocks: [],
    });
  }
  return slides;
}

function ReportViewer({ report }: { report: SprintReport }) {
  const allSlides = buildSlides(report);
  const { currentSlide, currentIndex, goTo, goNext, goPrev } = useSlideNavigation(allSlides);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const prevIndex = useRef(currentIndex);

  useEffect(() => {
    if (currentIndex !== prevIndex.current) {
      setDirection(currentIndex > prevIndex.current ? 'right' : 'left');
      prevIndex.current = currentIndex;
    }
  }, [currentIndex]);

  return (
    <Layout
      header={
        <ReportHeader
          meta={report.meta}
          slides={allSlides}
          currentIndex={currentIndex}
          onGoTo={goTo}
          onPrev={goPrev}
          onNext={goNext}
        />
      }
      footer={<ReportFooter generatedAt={report.meta.generatedAt} />}
    >
      <SlideNavigation
        currentIndex={currentIndex}
        totalSlides={allSlides.length}
        onPrev={goPrev}
        onNext={goNext}
      />
      <SlideViewer
        slide={currentSlide}
        direction={direction}
        overviewItems={currentSlide.type === 'summary'
          ? report.themes
              .map((theme, i) => ({ theme, slideIndex: i + 1 }))
              .filter(({ theme }) => theme.includeInOverview !== false)
          : undefined}
        onGoTo={goTo}
      />
      <DetailSection blocks={currentSlide.detailBlocks} />
    </Layout>
  );
}

export default function App() {
  const [mode, setMode] = useState<AppMode>({ state: 'loading' });

  useEffect(() => {
    initThemeMode();

    // Detect mode: explicit injection (production) OR URL path contains /reports/ (dev)
    const reportUrl = window.__REPORT_DATA_URL__
      ?? (window.location.pathname.includes('/reports/') ? './data.json' : null);

    if (reportUrl) {
      // Report page mode
      fetch(reportUrl)
        .then(r => {
          if (!r.ok) throw new Error(`Failed to load report: ${r.status}`);
          return r.json() as Promise<SprintReport>;
        })
        .then(report => setMode({ state: 'report', report }))
        .catch(e => setMode({ state: 'error', message: String(e) }));
    } else {
      // Home page mode
      fetch('reports/index.json')
        .then(r => {
          if (!r.ok) throw new Error(`Failed to load report index: ${r.status}`);
          return r.json() as Promise<ReportIndex>;
        })
        .then(index => setMode({ state: 'home', index }))
        .catch(e => setMode({ state: 'error', message: String(e) }));
    }
  }, []);

  if (mode.state === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Text tone="muted">Loading...</Text>
      </div>
    );
  }

  if (mode.state === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Text tone="muted">{mode.message}</Text>
      </div>
    );
  }

  if (mode.state === 'home') {
    return <HomePage index={mode.index} />;
  }

  return <ReportViewer report={mode.report} />;
}
