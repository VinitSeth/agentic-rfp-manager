export type ChartItem = {
  label: string;
  value: number;
  color: "blue" | "teal" | "green" | "cyan" | "purple" | "gold";
};

type LifecycleChartProps = {
  items: ChartItem[];
};

export function LifecycleChart({ items }: LifecycleChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="chart" aria-label="RFP lifecycle chart">
      {items.map((item) => {
        const visualHeight = Math.max((item.value / maxValue) * 170, 18);

        return (
          <div key={item.label} className="bar-group">
            <div className="bar-value">{item.value}</div>
            <div className="bar-wrapper">
              <div className={`bar bar-${item.color}`} style={{ height: `${visualHeight}px` }} />
            </div>
            <span className="bar-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
