// === Report index (home page) ===

export interface ReportIndex {
  team: string;
  description?: string;
  reports: ReportSummary[];
}

export interface ReportSummary {
  slug: string;
  title: string;
  dateRange: { start: string; end: string };
  stats: SummaryStat[];
}

// === Top-level report ===

export interface SprintReport {
  meta: ReportMeta;
  summary: SummarySlide;
  themes: ThemeSlide[];
}

export interface ReportMeta {
  title: string;
  team: string;
  dateRange: { start: string; end: string };
  repos: RepoInfo[];
  generatedAt: string;
  contact?: ContactItem[];
  showQA?: boolean;
}

export interface RepoInfo {
  name: string;
  url: string;
}

// === Slide types ===

export type Slide = SummarySlide | ThemeSlide | QASlide;

export interface SummarySlide {
  type: "summary";
  slug: string;
  title: string;
  subtitle?: string;
  stats: SummaryStat[];
  highlights?: string[];
  detailBlocks: DetailBlock[];
}

export interface SummaryStat {
  label: string;
  value: number | string;
  change?: number;
  lowerIsBetter?: boolean;
  icon?: string;
}

export interface ThemeSlide {
  type: "theme";
  slug: string;
  title: string;
  status: "completed" | "in-progress" | "blocked";
  description?: string;
  hasDemo?: boolean;
  includeInOverview?: boolean;
  progress?: ThreePColumn;
  problems?: ThreePColumn;
  plans?: ThreePColumn;
  detailBlocks: DetailBlock[];
}

export interface ContactItem {
  text: string;
  url?: string;
}

export interface QASlide {
  type: "qa";
  slug: string;
  title: string;
  contact?: ContactItem[];
  detailBlocks: DetailBlock[];
}

export interface ThreePColumn {
  items: ThreePItem[];
}

export interface ThreePItem {
  text: string;
  link?: string;
}

// === Detail blocks (widget system) ===

export type DetailBlock =
  | MarkdownBlock
  | VideoBlock
  | MetricBlock
  | ChartBlock
  | LinkListBlock
  | ContributorListBlock;

export interface MarkdownBlock {
  type: "markdown";
  title?: string;
  content: string;
}

export interface VideoBlock {
  type: "video";
  title?: string;
  description?: string;
  url: string;
}

export interface MetricBlock {
  type: "metric";
  title?: string;
  metrics: Metric[];
}

export interface Metric {
  label: string;
  value: number | string;
  previousValue?: number | string;
  unit?: string;
  trend?: "up" | "down" | "flat";
  source?: string;
  sourceUrl?: string;
}

export interface ChartBlock {
  type: "chart";
  title?: string;
  chartType: "line" | "bar" | "area";
  xAxisLabel?: string;
  yAxisLabel?: string;
  series: ChartSeries[];
}

export interface ChartSeries {
  name: string;
  color?: string;
  data: ChartDataPoint[];
}

export interface ChartDataPoint {
  x: string | number;
  y: number;
}

export interface LinkListBlock {
  type: "link-list";
  title?: string;
  links: LinkItem[];
}

export interface LinkItem {
  label: string;
  url: string;
  description?: string;
  repo?: string;
  type?: "pr" | "issue" | "commit" | "doc" | "external";
}

export interface ContributorListBlock {
  type: "contributor-list";
  title?: string;
  contributors: Contributor[];
}

export interface Contributor {
  name: string;
  username: string;
  avatarUrl?: string;
  commits?: number;
  linesAdded?: number;
  linesRemoved?: number;
  prsOpened?: number;
  prsMerged?: number;
}
