import { Card, Heading, Link, Pill, Text } from '@noahwright/design';
import type { LinkListBlock } from '../../types/report';
import './LinkListWidget.css';

const typeIcons: Record<string, string> = {
  pr: '\uD83D\uDD00',        // 🔀
  issue: '\uD83D\uDCCB',     // 📋
  commit: '\uD83D\uDCBE',    // 💾
  doc: '\uD83D\uDCD6',       // 📖
  external: '\uD83D\uDD17',  // 🔗
};

export function LinkListWidget({ block }: { block: LinkListBlock }) {
  return (
    <Card flat>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      <ul className="rr-link-list">
        {block.links.map((link, i) => (
          <li key={i} className="rr-link-list__item">
            <div className="rr-link-list__main">
              {link.type && <span className="rr-link-list__icon">{typeIcons[link.type] ?? ''}</span>}
              <Link href={link.url} isExternal>{link.label}</Link>
              {link.repo && <Pill size="small" variant="secondary">{link.repo}</Pill>}
            </div>
            {link.description && <Text inline tone="muted">{link.description}</Text>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
