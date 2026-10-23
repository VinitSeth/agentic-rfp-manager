export type ActivityItem = {
  icon: string;
  tone: "blue" | "gray" | "teal" | "purple";
  title: string;
  time: string;
};

type ActivityListProps = {
  items: ActivityItem[];
};

const toneClasses = {
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-slate-200 text-slate-600",
  teal: "bg-teal-100 text-teal-700",
  purple: "bg-violet-100 text-violet-700",
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${toneClasses[item.tone]}`}>
            {item.icon}
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-slate-700">{item.title}</span>
            <small className="mt-1 block text-xs text-slate-500">{item.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
