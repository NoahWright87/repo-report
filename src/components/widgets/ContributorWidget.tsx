import { Card, Heading, Avatar, Text, Badge } from '@noahwright/design';
import type { ContributorListBlock } from '../../types/report';
import './ContributorWidget.css';

export function ContributorWidget({ block }: { block: ContributorListBlock }) {
  return (
    <div>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      <div className="rr-contributors">
        {block.contributors.map((c) => (
          <Card key={c.username} flat className="rr-contributor-card">
            <div className="rr-contributor">
              <Avatar
                src={c.avatarUrl}
                alt={c.name}
                label={c.name}
                size={48}
              />
              <div className="rr-contributor__info">
                <Text><strong>{c.name}</strong></Text>
                <Text tone="muted">@{c.username}</Text>
              </div>
              <div className="rr-contributor__stats">
                {c.commits != null && (
                  <Badge count={c.commits} variant="primary" label={`${c.commits} commits`}>
                    <span className="rr-contributor__stat-label">commits</span>
                  </Badge>
                )}
                {c.prsMerged != null && (
                  <Badge count={c.prsMerged} variant="confirm" label={`${c.prsMerged} PRs merged`}>
                    <span className="rr-contributor__stat-label">PRs merged</span>
                  </Badge>
                )}
              </div>
              {(c.linesAdded != null || c.linesRemoved != null) && (
                <Text tone="muted" className="rr-contributor__lines">
                  {c.linesAdded != null && <span className="rr-contributor__added">+{c.linesAdded.toLocaleString()}</span>}
                  {c.linesRemoved != null && <span className="rr-contributor__removed">&nbsp;-{c.linesRemoved.toLocaleString()}</span>}
                </Text>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
