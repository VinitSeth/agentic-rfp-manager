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

<<<<<<< HEAD
=======
const toneClasses = {
  green: "border-emerald-200 bg-emerald-50",
  blue: "border-blue-200 bg-blue-50",
  red: "border-rose-200 bg-rose-50",
  purple: "border-violet-200 bg-violet-50",
};

const textToneClasses = {
  green: "text-emerald-700",
  blue: "text-blue-700",
  red: "text-rose-700",
  purple: "text-violet-700",
};

>>>>>>> main
export function MetricCard({ metric }: MetricCardProps) {
  const trendIcon = metric.direction === "up" ? "↗" : "↘";

  return (
<<<<<<< HEAD
    <article className={`stat-card stat-${metric.tone}`}>
      <div className="stat-label">{metric.label}</div>
      <div className="stat-value">{metric.value}</div>
      <div className={`stat-change ${metric.direction}`}>
        <span className="stat-arrow">{trendIcon}</span>
=======
    <article className={`rounded-[18px] border p-4 shadow-[0_10px_18px_rgba(15,23,42,0.02)] ${toneClasses[metric.tone]}`}>
      <div className="text-sm font-medium text-slate-500">{metric.label}</div>
      <div className="mt-3 text-[2rem] font-bold tracking-[-0.06em] text-slate-800">{metric.value}</div>
      <div className={`mt-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${textToneClasses[metric.tone]} bg-white/70`}>
        <span>{trendIcon}</span>
>>>>>>> main
        {metric.change}
      </div>
    </article>
  );
}
