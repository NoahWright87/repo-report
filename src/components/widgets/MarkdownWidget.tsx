import { Card, Heading } from '@noahwright/design';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { MarkdownBlock } from '../../types/report';

export function MarkdownWidget({ block }: { block: MarkdownBlock }) {
  return (
    <Card flat>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      <div className="rr-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {block.content}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
