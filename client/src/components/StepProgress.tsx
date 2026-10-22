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
    <div className="step-progress" aria-label="RFP creation steps">
      {steps.map((step, index) => (
        <div className="step-group" key={step.label}>
          <div className={`step-node ${step.status}`}>
            {step.status === "complete" ? "✓" : index + 1}
          </div>
          <span className={`step-label ${step.status}`}>{step.label}</span>
          {index < steps.length - 1 && <span className="step-divider" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
