// components/ProposalTabs.tsx

export interface ProposalTab {
  id: string;
  label: string;
  count: number;
}

interface ProposalTabsProps {
  tabs: ProposalTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function ProposalTabs({
  tabs,
  activeTab,
  onChange,
}: ProposalTabsProps) {
  return (
    <div className="border-b border-slate-200 mb-6">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                relative
                pb-3
                text-sm
                font-medium
                transition-colors
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }
              `}
            >
              {tab.label} ({tab.count})

              {isActive && (
                <span
                  className="
                    absolute
                    left-0
                    bottom-0
                    h-[3px]
                    w-full
                    rounded-full
                    bg-blue-600
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}