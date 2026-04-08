import { Heading, Text, Card, Pill } from '@noahwright/design';
import type { SummarySlide } from '../../types/report';
import type { OverviewItem } from '../../App';
import './SummarySlideContent.css';

interface Props {
  slide: SummarySlide;
  overviewItems?: OverviewItem[];
  onGoTo?: (index: number) => void;
}

function OverviewCard({ item, onGoTo }: { item: OverviewItem; onGoTo?: (i: number) => void }) {
  const preview = item.theme.description ?? item.theme.progress?.items[0]?.text;
  return (
    <button className="rr-overview-card" onClick={() => onGoTo?.(item.slideIndex)}>
      <Card interactive flat className="rr-overview-card__inner">
        <div className="rr-overview-card__header">
          <Text inline><strong>{item.theme.title}</strong></Text>
          {item.theme.hasDemo && (
            <Pill size="small" variant="secondary">Live Demo 📽️</Pill>
          )}
        </div>
        {preview && (
          <Text tone="muted" className="rr-overview-card__preview">{preview}</Text>
        )}
      </Card>
    </button>
  );
}

export function SummarySlideContent({ slide, overviewItems, onGoTo }: Props) {
  return (
    <div className="rr-summary">
      <Heading level={1}>{slide.title}</Heading>
      {slide.subtitle && <Text tone="muted">{slide.subtitle}</Text>}

      {slide.stats.length > 0 && (
        <div className="rr-summary__stats">
          {slide.stats.map((stat, i) => (
            <Card key={i} flat className="rr-summary__stat-card">
              <div className="rr-summary__stat">
                {stat.icon && <span className="rr-summary__stat-icon">{stat.icon}</span>}
                <span className="rr-summary__stat-value">{stat.value}</span>
                <span className="rr-summary__stat-label">{stat.label}</span>
                {stat.change != null && (
                  <span className={`rr-summary__stat-change ${(stat.change >= 0) !== (stat.lowerIsBetter ?? false) ? 'rr-summary__stat-change--up' : 'rr-summary__stat-change--down'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {slide.highlights && slide.highlights.length > 0 && (
        <div className="rr-summary__highlights">
          <Heading level={4}>Highlights</Heading>
          <ul className="rr-summary__highlight-list">
            {slide.highlights.map((h, i) => (
              <li key={i}><Text inline>{h}</Text></li>
            ))}
          </ul>
        </div>
      )}

      {overviewItems && overviewItems.length > 0 && (
        <div className="rr-summary__overview">
          <Heading level={4}>Contents</Heading>
          <div className="rr-summary__overview-grid">
            {overviewItems.map((item) => (
              <OverviewCard key={item.theme.slug} item={item} onGoTo={onGoTo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
