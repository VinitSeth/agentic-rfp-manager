export type StepStatus = "complete" | "current" | "upcoming";

export type StepItem = {
  label: string;
  status: StepStatus;
};

type StepProgressProps = {
  steps: StepItem[];
};

export function StepProgress({ steps }: StepProgressProps) {
  return (
<<<<<<< HEAD
    <div className="step-progress" aria-label="RFP creation steps">
      {steps.map((step, index) => (
        <div className="step-group" key={step.label}>
          <div className={`step-node ${step.status}`}>
            {step.status === "complete" ? "✓" : index + 1}
          </div>
          <span className={`step-label ${step.status}`}>{step.label}</span>
          {index < steps.length - 1 && <span className="step-divider" aria-hidden="true" />}
=======
    <div className="flex flex-wrap items-center gap-3 px-2 py-3" aria-label="RFP creation steps">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              step.status === "complete"
                ? "bg-[#eaf6ee] text-[#1e7d4b]"
                : step.status === "current"
                  ? "bg-[#dfeafc] text-[#1d6fe8]"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {step.status === "complete" ? "✓" : index + 1}
          </div>
          <span
            className={`text-sm font-medium ${
              step.status === "current"
                ? "text-[#1d6fe8]"
                : step.status === "complete"
                  ? "text-[#1e7d4b]"
                  : "text-slate-500"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && <span className="mx-1 h-px w-10 bg-slate-200" aria-hidden="true" />}
>>>>>>> main
        </div>
      ))}
    </div>
  );
}
