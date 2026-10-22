export type Metric = {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  tone: "green" | "blue" | "red" | "purple";
};

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const trendIcon = metric.direction === "up" ? "↗" : "↘";

  return (
    <article className={`stat-card stat-${metric.tone}`}>
      <div className="stat-label">{metric.label}</div>
      <div className="stat-value">{metric.value}</div>
      <div className={`stat-change ${metric.direction}`}>
        <span className="stat-arrow">{trendIcon}</span>
        {metric.change}
      </div>
    </article>
  );
}
