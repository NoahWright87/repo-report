import { Heading, Text, Card } from '@noahwright/design';
import type { ThemeSlide } from '../../types/report';
import './ThemeSlideContent.css';

function ThreePItems({ items }: { items: { text: string; link?: string }[] }) {
  return (
    <ul className="rr-theme__list">
      {items.map((item, i) => (
        <li key={i}>
          {item.link
            ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="rr-theme__item-link"><Text inline>{item.text}</Text></a>
            : <Text inline>{item.text}</Text>
          }
        </li>
      ))}
    </ul>
  );
}

export function ThemeSlideContent({ slide }: { slide: ThemeSlide }) {
  const progress = slide.progress?.items?.length ? slide.progress.items : null;
  const problems = slide.problems?.items?.length ? slide.problems.items : null;
  const plans    = slide.plans?.items?.length    ? slide.plans.items    : null;
  const hasAny   = progress || problems || plans;

  return (
    <div className="rr-theme">
      <div className="rr-theme__header">
        <Heading level={2}>{slide.title}</Heading>
      </div>

      {hasAny && (
        <div className="rr-theme__columns">
          {progress && (
            <Card flat className="rr-theme__column">
              <div className="rr-theme__column-header">
                <Heading level={4} color="var(--confirm)">Progress</Heading>
              </div>
              <ThreePItems items={progress} />
            </Card>
          )}
          {problems && (
            <Card flat className="rr-theme__column">
              <div className="rr-theme__column-header">
                <Heading level={4} color="var(--danger)">Problems</Heading>
              </div>
              <ThreePItems items={problems} />
            </Card>
          )}
          {plans && (
            <Card flat className="rr-theme__column">
              <div className="rr-theme__column-header">
                <Heading level={4} color="var(--primary)">Plans</Heading>
              </div>
              <ThreePItems items={plans} />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
