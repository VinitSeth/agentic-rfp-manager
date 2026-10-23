export type StatusType =
  | "validated"
  | "processing"
  | "review";

type StatusBadgeProps = {
  status: StatusType;
};

const statusConfig = {
  validated: {
    label: "Validated",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  processing: {
    label: "Processing",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  review: {
    label: "Needs Review",
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-sm
        font-medium
        ${config.bg}
        ${config.text}
      `}
    >
      <span
        className={`h-2 w-2 rounded-full ${config.dot}`}
      />
      {config.label}
    </span>
  );
}