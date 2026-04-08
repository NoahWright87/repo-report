import { Layout, Header, Footer, Heading, Text, Card, CardGrid, ToggleIcon, Menu, Button, toggleThemeMode, getThemeMode } from '@noahwright/design';
import type { ReportIndex } from '../types/report';
import './HomePage.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatYear(iso: string) {
  return new Date(iso).getFullYear();
}

export function HomePage({ index }: { index: ReportIndex }) {
  const latestYear = index.reports.length > 0
    ? formatYear(index.reports[0].dateRange.end)
    : new Date().getFullYear();

  return (
    <Layout
      header={
        <Header
          left={
            <Menu
              trigger={<Button variant="ghost" size="small" motion="none">☰</Button>}
              items={[
                { text: 'All Reports', icon: '🏠', href: window.location.pathname },
              ]}
            />
          }
          center={<Text>{index.team} &mdash; Reports</Text>}
          right={
            <ToggleIcon
              preset="moon-sun"
              defaultToggled={getThemeMode() === 'dark'}
              onChange={() => toggleThemeMode()}
              label="Toggle dark mode"
              size="md"
            />
          }
        />
      }
      footer={
        <Footer center={<Text tone="muted">{latestYear} {index.team}</Text>} />
      }
    >
      <div className="rr-home">
        <div className="rr-home__hero">
          <Heading level={1}>{index.team}</Heading>
          {index.description && <Text tone="muted">{index.description}</Text>}
        </div>

        <CardGrid minCardWidth="320px" gap="lg">
          {index.reports.map((report) => (
            <a
              key={report.slug}
              href={`reports/${report.slug}/`}
              className="rr-home__card-link"
            >
              <Card interactive>
                <Heading level={3}>{report.title}</Heading>
                <Text tone="muted">
                  {formatDate(report.dateRange.start)} &ndash; {formatDate(report.dateRange.end)}, {formatYear(report.dateRange.end)}
                </Text>
                <div className="rr-home__card-stats">
                  {report.stats.map((stat, i) => (
                    <div key={i} className="rr-home__stat">
                      <span className="rr-home__stat-value">{stat.value}</span>
                      <span className="rr-home__stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </a>
          ))}
        </CardGrid>
      </div>
    </Layout>
  );
}
