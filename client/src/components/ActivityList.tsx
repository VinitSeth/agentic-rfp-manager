export type ActivityItem = {
  icon: string;
  tone: "blue" | "gray" | "teal" | "purple";
  title: string;
  time: string;
};

type ActivityListProps = {
  items: ActivityItem[];
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="activity-list">
      {items.map((item) => (
        <div key={item.title} className="activity-row">
          <div className={`activity-icon tone-${item.tone}`}>{item.icon}</div>
          <div className="activity-copy">
            <span>{item.title}</span>
            <small>{item.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
