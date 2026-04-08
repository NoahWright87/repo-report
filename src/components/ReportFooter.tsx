import { Footer, Text } from '@noahwright/design';

export function ReportFooter({ generatedAt }: { generatedAt: string }) {
  const date = new Date(generatedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Footer
      center={
        <Text tone="muted">
          Report generated {date}
        </Text>
      }
    />
  );
}
