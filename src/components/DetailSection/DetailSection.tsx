import type { DetailBlock as DetailBlockType } from '../../types/report';
import { MarkdownWidget } from '../widgets/MarkdownWidget';
import { VideoWidget } from '../widgets/VideoWidget';
import { MetricWidget } from '../widgets/MetricWidget';
import { ChartWidget } from '../widgets/ChartWidget';
import { LinkListWidget } from '../widgets/LinkListWidget';
import { ContributorWidget } from '../widgets/ContributorWidget';
import './DetailSection.css';

function DetailBlock({ block }: { block: DetailBlockType }) {
  switch (block.type) {
    case 'markdown': return <MarkdownWidget block={block} />;
    case 'video': return <VideoWidget block={block} />;
    case 'metric': return <MetricWidget block={block} />;
    case 'chart': return <ChartWidget block={block} />;
    case 'link-list': return <LinkListWidget block={block} />;
    case 'contributor-list': return <ContributorWidget block={block} />;
  }
}

export function DetailSection({ blocks }: { blocks: DetailBlockType[] }) {
  if (blocks.length === 0) return null;

  return (
    <section className="rr-details" aria-label="Slide details">
      <div className="rr-details__scroll-hint">
        <span className="rr-details__scroll-line" />
        <span className="rr-details__scroll-text">Details</span>
        <span className="rr-details__scroll-line" />
      </div>
      <div className="rr-details__blocks">
        {blocks.map((block, i) => (
          <div key={i} className="rr-details__block">
            <DetailBlock block={block} />
          </div>
        ))}
      </div>
    </section>
  );
}
