export type ChartItem = {
  label: string;
  value: number;
  color: "blue" | "teal" | "green" | "cyan" | "purple" | "gold";
};

type LifecycleChartProps = {
  items: ChartItem[];
};

<<<<<<< HEAD
=======
const colorClasses = {
  blue: "bg-blue-500",
  teal: "bg-teal-500",
  green: "bg-emerald-500",
  cyan: "bg-cyan-500",
  purple: "bg-violet-500",
  gold: "bg-amber-400",
};

>>>>>>> main
export function LifecycleChart({ items }: LifecycleChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
<<<<<<< HEAD
    <div className="chart" aria-label="RFP lifecycle chart">
=======
    <div className="flex h-[220px] items-end justify-between gap-4" aria-label="RFP lifecycle chart">
>>>>>>> main
      {items.map((item) => {
        const visualHeight = Math.max((item.value / maxValue) * 170, 18);

        return (
<<<<<<< HEAD
          <div key={item.label} className="bar-group">
            <div className="bar-value">{item.value}</div>
            <div className="bar-wrapper">
              <div className={`bar bar-${item.color}`} style={{ height: `${visualHeight}px` }} />
            </div>
            <span className="bar-label">{item.label}</span>
=======
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="text-xs font-semibold text-slate-500">{item.value}</div>
            <div className="flex h-[170px] w-full items-end justify-center rounded-xl bg-slate-100 p-1">
              <div className={`w-full rounded-t-lg ${colorClasses[item.color]}`} style={{ height: `${visualHeight}px` }} />
            </div>
            <span className="text-xs font-medium text-slate-500">{item.label}</span>
>>>>>>> main
          </div>
        );
      })}
    </div>
  );
}
