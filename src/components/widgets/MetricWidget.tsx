import { Card, Heading, Text, Pill } from '@noahwright/design';
import type { MetricBlock } from '../../types/report';
import './MetricWidget.css';

const trendArrow = { up: '\u2191', down: '\u2193', flat: '\u2192' } as const;
const trendVariant = { up: 'confirm', down: 'danger', flat: 'default' } as const;

export function MetricWidget({ block }: { block: MetricBlock }) {
  return (
    <div>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      <div className="rr-metrics">
        {block.metrics.map((metric, i) => (
          <Card key={i} flat className="rr-metric-card">
            <div className="rr-metric">
              <Text tone="muted" className="rr-metric__label">{metric.label}</Text>
              <div className="rr-metric__value">
                {metric.value}{metric.unit && <span className="rr-metric__unit">{metric.unit}</span>}
              </div>
              {metric.previousValue != null && (
                <Text tone="muted" className="rr-metric__previous">
                  was {metric.previousValue}{metric.unit ?? ''}
                </Text>
              )}
              {metric.trend && (
                <Pill
                  size="small"
                  variant={trendVariant[metric.trend]}
                >
                  {trendArrow[metric.trend]} {metric.trend}
                </Pill>
              )}
              {metric.source && (
                <Text tone="muted" className="rr-metric__source">
                  via {metric.source}
                </Text>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
