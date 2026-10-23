export type Vendor = {
  name: string;
  matchScore: number;
  strengths: string[];
  location: string;
};

type VendorTableProps = {
  vendors: Vendor[];
};

function SortIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M5 7h10l-5 6-5-6zm0 6h10l-5-6-5 6z" opacity="0.7" />
    </svg>
  );
}

export function VendorTable({ vendors }: VendorTableProps) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_8px_12px_rgba(15,23,42,0.04)]">
      <div className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_0.5fr] items-center border-b border-slate-200 bg-[#e7edf3] px-5 py-4 text-[15px] font-semibold text-slate-600">
        <div>Vendor</div>
        <div className="flex items-center gap-1.5">
          <span>Match Score</span>
          <SortIcon />
        </div>
        <div>Key Strengths</div>
        <div className="flex items-center gap-1.5">
          <span>Location</span>
          <SortIcon />
        </div>
        <div className="text-right">Actions</div>
      </div>

      {vendors.map((vendor) => (
        <div
          key={vendor.name}
          className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_0.5fr] items-center border-b border-slate-200 px-5 py-4 text-[15px] last:border-b-0"
        >
          <div className="pr-4 font-semibold text-slate-700">{vendor.name}</div>

          <div className="flex items-center gap-3 pr-4">
            <span className="min-w-[42px] font-semibold text-slate-700">{vendor.matchScore}%</span>
            <div className="h-2.5 w-24 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#32d296] via-[#34c98b] to-[#2ab77a]"
                style={{ width: `${vendor.matchScore}%` }}
              />
            </div>
          </div>

          <div className="pr-4 text-slate-600">{vendor.strengths.join(", ")}</div>

          <div className="pr-4 text-slate-600">{vendor.location}</div>

          <div className="text-right">
            <button
              type="button"
              className="min-w-[80px] rounded-lg border border-blue-200 bg-[#edf5ff] px-4 py-2 text-sm font-semibold text-[#1d6fe8] transition hover:bg-blue-100"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
