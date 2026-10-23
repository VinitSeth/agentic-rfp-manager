type RequirementReviewCardProps = {
  title: string;
  value: string;
  maxLength: number;
};

export function RequirementReviewCard({ title, value, maxLength }: RequirementReviewCardProps) {
  return (
    <div className="rounded-[14px] border border-slate-200 bg-slate-50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
        <span className="text-xs font-medium text-slate-500">
          {value.length}/{maxLength}
        </span>
      </div>

      <textarea
        value={value}
        readOnly
        aria-label={title}
        className="min-h-[180px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-[0.96rem] leading-7 text-slate-700 outline-none ring-0"
      />
    </div>
  );
}
