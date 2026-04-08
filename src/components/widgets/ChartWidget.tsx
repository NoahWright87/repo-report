import { Card, Heading } from '@noahwright/design';
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useThemeColors } from '../../hooks/useThemeColors';
import type { ChartBlock } from '../../types/report';
import './ChartWidget.css';

const DEFAULT_COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#dc2626', '#ea580c'];

export function ChartWidget({ block }: { block: ChartBlock }) {
  const themeColors = useThemeColors();

  const mergedData = block.series[0]?.data.map((point, i) => {
    const row: Record<string, string | number> = { x: point.x };
    block.series.forEach(s => {
      row[s.name] = s.data[i]?.y ?? 0;
    });
    return row;
  }) ?? [];

  const seriesColors = block.series.map((s, i) =>
    s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  );

  const grid = <CartesianGrid strokeDasharray="3 3" stroke={`${themeColors.foreground}22`} />;
  const xAxis = <XAxis dataKey="x" tick={{ fill: themeColors.foreground, fontSize: 12 }} label={block.xAxisLabel ? { value: block.xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} />;
  const yAxis = <YAxis tick={{ fill: themeColors.foreground, fontSize: 12 }} label={block.yAxisLabel ? { value: block.yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />;
  const tooltip = <Tooltip contentStyle={{ background: themeColors.background, border: `1px solid ${themeColors.foreground}22`, borderRadius: 8 }} />;
  const legend = block.series.length > 1 ? <Legend /> : null;

  const chartWidth = 1000;
  const chartHeight = 300;
  const commonProps = {
    width: chartWidth,
    height: chartHeight,
    data: mergedData,
    margin: { top: 5, right: 20, bottom: 5, left: 0 },
  };

  const renderChart = () => {
    switch (block.chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {grid}{xAxis}{yAxis}{tooltip}{legend}
            {block.series.map((s, i) => (
              <Line key={s.name} type="monotone" dataKey={s.name} stroke={seriesColors[i]} strokeWidth={2} dot={{ r: 3 }} />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {grid}{xAxis}{yAxis}{tooltip}{legend}
            {block.series.map((s, i) => (
              <Bar key={s.name} dataKey={s.name} fill={seriesColors[i]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {grid}{xAxis}{yAxis}{tooltip}{legend}
            {block.series.map((s, i) => (
              <Area key={s.name} type="monotone" dataKey={s.name} stroke={seriesColors[i]} fill={`${seriesColors[i]}33`} />
            ))}
          </AreaChart>
        );
    }
  };

  return (
    <Card flat>
      {block.title && <Heading level={4}>{block.title}</Heading>}
      <div className="rr-chart-wrapper">
        {renderChart()}
      </div>
    </Card>
  );
}
