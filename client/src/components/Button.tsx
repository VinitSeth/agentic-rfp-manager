type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export function Button({
  label,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl
        border
        border-blue-300
        px-6
        py-2
        text-sm
        font-medium
        text-blue-600
        transition
        hover:bg-blue-50
      "
    >
      {label}
    </button>
  );
}