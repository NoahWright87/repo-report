import { Card, Heading, Text } from '@noahwright/design';
import type { VideoBlock } from '../../types/report';
import './VideoWidget.css';

function getEmbedUrl(url: string): string {
  // Convert YouTube watch URLs to embed URLs
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Convert Loom share URLs to embed URLs
  const loomMatch = url.match(/loom\.com\/share\/([\w-]+)/);
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`;

  return url;
}

export function VideoWidget({ block }: { block: VideoBlock }) {
  return (
    <Card flat>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      {block.description && <Text tone="muted">{block.description}</Text>}
      <div className="rr-video">
        <iframe
          src={getEmbedUrl(block.url)}
          title={block.title ?? 'Video'}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </Card>
  );
}
