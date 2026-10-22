type RequirementReviewCardProps = {
  title: string;
  value: string;
  maxLength: number;
};

export function RequirementReviewCard({ title, value, maxLength }: RequirementReviewCardProps) {
  return (
    <div className="requirement-card">
      <div className="requirement-card__header">
        <h3>{title}</h3>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>

      <textarea value={value} readOnly aria-label={title} />
    </div>
  );
}
